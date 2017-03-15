'use strict'

var wx = require('../../wx/index')
var util = require('../../libs/util')

exports.guess = function*(next) {
    var wechatApi = wx.getWechat()
    var data = yield wechatApi.fetchAccessToken()
    var access_token = data.access_token
    var ticketData = yield wechatApi.fetchTicket(access_token)
    var ticket = ticketData.ticket
    var url = this.href
    var params = util.sign(ticket, url)

    yield this.render('wechat/game', params)
}


exports.find = function*(next) {
    var wechatApi = wx.getWechat()
    var data = yield wechatApi.fetchAccessToken()
    var access_token = data.access_token
    var ticketData = yield wechatApi.fetchTicket(access_token)
    var ticket = ticketData.ticket
    var url = this.href
    var params = util.sign(ticket, url)

    yield this.render('wechat/game', params)
}
