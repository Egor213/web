"use strict";

var _excluded = ["id"];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var path = require('path');
var db_users = require(path.join(__dirname, '..', '..', 'database_controllers', 'database_users_controller'));
var UserController = /*#__PURE__*/function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }
  return _createClass(UserController, [{
    key: "renderUserNews",
    value: function renderUserNews(req, res) {
      var user_id = req.params.id;
      var data = db_users.getNewsFriends(user_id);
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          error: "Новости пользователя не найдены"
        });
      }
    }
  }, {
    key: "renderUserFriends",
    value: function renderUserFriends(req, res) {
      var user_id = req.params.id;
      var data = db_users.getJSONFriendsUser(user_id);
      if (data) res.status(200).json(data);else res.status(404).json({
        error: "Друзья не найдены"
      });
    }
  }, {
    key: "renderUserName",
    value: function renderUserName(req, res) {
      var user_id = req.params.id;
      var data = db_users.getNameUser(user_id);
      if (data) res.status(200).json(data);else res.status(404).json({
        error: "Пользователь не найден"
      });
    }
  }, {
    key: "renderUserJSON",
    value: function renderUserJSON(req, res) {
      var user_id = req.params.id;
      var data = db_users.getUserById(user_id);
      if (data) res.status(200).json(data);else res.status(404).json({
        error: "Пользователь не найден"
      });
    }
  }, {
    key: "changeParams",
    value: function changeParams(req, res) {
      var _req$body = req.body,
        id = _req$body.id,
        data = _objectWithoutProperties(_req$body, _excluded);
      var change_param = db_users.changeParam(data, id);
      if (change_param) res.status(200).json(change_param);else res.status(404).json({
        error: "Данные не были изменены!"
      });
    }
  }]);
}();
module.exports = new UserController();