module.exports.index = function (req, res) {
    var page = parseInt(req.query.page) || 1; // n
    var perPage = 8; // x;

    // begin = (n-1) * x;
    // end = (n-1) * x + x = n * x;
    // items = array.slice(begin, end)

    var start = (page - 1) * perPage;
    var end = page * perPage;

    var drop = (page - 1) * perPage;
    var numberPagination = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    var perPagination = 2;
    var startPagination = (page - 1) * perPagination;
    var endPagination = page * perPagination;

    res.render('products/index', {
        products: db.get('products').drop(drop).take(perPage).value(),
        paginations: numberPagination.slice(startPagination, endPagination),
        paginationsNumber: page
    });
}