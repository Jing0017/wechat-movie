/**
 * Created by yj on 14/03/2017.
 */
var Movie = require('../models/movie')
var Category = require('../models/category')
var koa_request = require('koa-request')

//index page
exports.findAll = function *() {
    var categories = yield Category.find({})
        .populate({
            path: 'movies',
            select: 'title poster',
            options: {limit: 5}
        })
        .exec()
    return categories
}

// search page
exports.searchByCategory = function *(catId) {
    var categories = yield Category
        .find({_id: catId})
        .populate({
            path: 'movies',
            select: 'title poster'
            // options: { limit: 2, skip: index }
        })
        .exec()
    return categories
}

exports.searchByName = function *(q) {
    var movies = yield  Movie
        .find({title: new RegExp(q + '.*', 'i')})
        .exec()
    return movies
}

exports.searchByDouban = function *(q) {
    var options = {
        url: 'https://api.douban.com/v2/movie/search?q='
    }

    options.url += encodeURIComponent(q)
    var response = yield koa_request(options)
    var data = JSON.parse(response.body)
    var subjects = []
    if (data && data.subjects) {
        subjects = data.subjects
    }

    return subjects

}