var db = require('../db');

module.exports.showAllCart = function (req, res, nest) {
    var sessionId = req.signedCookies.sessionId;
    var allCart = db.get('sessions')
        .find({
            id: sessionId
        })
        .get('cart')
        .value();
    var allProducts = db.get('products').value();
    var arrCart = [];
    var countCart = 0;
    for (var item in allCart) {
        for (var product of allProducts) {
            if (product.id === item) {
                arrCart.push({
                    "name": product.name,
                    "count": allCart[item]
                })
            }
            countCart += allCart[item];
        }
        res.render('cart/index', {
            arrCart: arrCart,
            countCart: countCart
        })
    }
}

module.exports.addToCart = function (req, res, next) {
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    if (!sessionId) {
        res.redirect('/products');
        return;
    }

    var count = db
        .get('sessions')
        .find({
            id: sessionId
        })
        .get('cart.' + productId, 0)
        .value();

    db.get('sessions')
        .find({
            id: sessionId
        })
        .set('cart.' + productId, count + 1)
        .write();

    res.redirect('/products');
};