require(`dotenv`).config();

// req.query
var express = require(`express`);
var bodyParser = require(`body-parser`);
var cookieParser = require(`cookie-parser`);
var csurf = require(`csurf`);
var mongoose = require(`mongoose`);
var db = require(`./db`);
var multer = require('multer');
const path = require('path');
// connect database mongodb
mongoose.connect(process.env.MONGO_URL);

var userRoute = require(`./routes/user.route`);
var homeRoute = require(`./routes/home.route`);
var authRoute = require(`./routes/auth.route`);
var productRoute = require(`./routes/product.route`);
var cartRoute = require(`./routes/cart.route`);
var transferRoute = require(`./routes/transfer.route`);
var testRoute = require(`./routes/test.route`);

var authMiddleware = require(`./middleware/auth.middleware`);
var sessionMiddleware = require(`./middleware/session.middleware`);

var port = 3000;

var app = express();
app.set(`view engine`, `pug`);
app.set(`views`, `./views`);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

// using cookie-parser
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.use(express.static(`public`));

// Routes
app.use(`/`, homeRoute);
app.use(`/users`, userRoute);
app.use(`/auth`, authRoute);
app.use(`/products`, productRoute);
app.use(`/cart`, cartRoute);
app.use(`/test`, testRoute);
app.use(csurf({
    cookie: true
}));
app.use(`/transfer`, authMiddleware.requireAuth, transferRoute);

app.listen(port, function () {
    console.log(`Server listening on port ` + port);
});