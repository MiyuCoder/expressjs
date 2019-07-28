var Product = require('../models/product.model');
module.exports.index = function (req, res) {
    // var page = parseInt(req.query.page) || 1; // n
    // var perPage = 8; // x;

    // // begin = (n-1) * x;
    // // end = (n-1) * x + x = n * x;
    // // items = array.slice(begin, end)

    // var drop = (page - 1) * perPage;
    // var numberPagination = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    // var perPagination = 1;
    // var startPagination = (page - 1) * perPagination;
    // var endPagination = page * perPagination;

    // var sessionId = req.signedCookies.sessionId;
    // var allCart = db.get('sessions').find({
    //     id: sessionId
    // }).get('cart').value();

    // var countCart = 0;
    // for (let item in allCart) {
    //     countCart += allCart[item];
    // }

    // res.render('products/index', {
    //     // products: db.get('products').slice(start, end).value();
    //     products: db.get('products').drop(drop).take(perPage).value(),
    //     paginations: numberPagination.slice(startPagination, endPagination),
    //     paginationsNumber: page,
    //     countCart: countCart
    // });

    Product.find().then(function (products) {
        res.render('products/index', {
            products: products
        });
    });
}