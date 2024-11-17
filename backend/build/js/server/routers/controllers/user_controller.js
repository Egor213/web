"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var path = require('path');
var db_news = require(path.join(__dirname, '..', '..', 'database_controllers', 'database_news_controller'));
var db_users = require(path.join(__dirname, '..', '..', 'database_controllers', 'database_users_controller'));
var UserController = /*#__PURE__*/function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }
  return _createClass(UserController, [{
    key: "renderUserNews",
    value: function renderUserNews(req, res) {
      var user_id = req.params.id;
      var friends = db_users.getIdFriendsUser(user_id);
      var temp_json = [];
      for (var index in friends) {
        var data = db_news.getNewsById(friends[index]);
        if (data) {
          temp_json.push(data);
        }
      }
      if (temp_json.length > 0) {
        res.status(200).json(temp_json);
      } else {
        res.status(404).json({
          error: "Новости пользователя не найдены"
        });
      }
    }
  }, {
    key: "renderUserFriends",
    value: function renderUserFriends(req, res) {}
  }]);
}();
module.exports = new UserController();