"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var fs = require('fs');
var _require = require('body-parser'),
  json = _require.json;
var path = require('path');
var db_news = require(path.join(__dirname, 'database_news_controller'));
var DatabaseUsersController = /*#__PURE__*/function () {
  function DatabaseUsersController(path_database) {
    _classCallCheck(this, DatabaseUsersController);
    this.path = path_database;
  }
  return _createClass(DatabaseUsersController, [{
    key: "getArrData",
    value: function getArrData() {
      try {
        var data = fs.readFileSync(this.path, 'utf8');
        var json_data = JSON.parse(data);
        return json_data['users'];
      } catch (e) {
        console.error("Ошибка при открытий JSON файла");
        return false;
      }
    }
  }, {
    key: "getAllUsers",
    value: function getAllUsers() {
      return this.getArrData();
    }
  }, {
    key: "getUserById",
    value: function getUserById(id) {
      var data = this.getArrData();
      for (var index in data) {
        if (data[index].id == id) return data[index];
      }
      return false;
    }
  }, {
    key: "getIdFriendsUser",
    value: function getIdFriendsUser(id) {
      var user = this.getUserById(id);
      if (user) return user.friends;
      return false;
    }
  }, {
    key: "getNameUser",
    value: function getNameUser(id) {
      var user = this.getUserById(id);
      if (user) return user.name;
      return false;
    }
  }, {
    key: "getJSONFriendsUser",
    value: function getJSONFriendsUser(id) {
      var data = this.getArrData();
      var id_friends = this.getIdFriendsUser(id);
      if (!id_friends) return false;
      var dest_json = [];
      for (var index in data) {
        if (id_friends.includes(data[index].id)) {
          dest_json.push(data[index]);
        }
      }
      return dest_json;
    }
  }, {
    key: "getNewsFriends",
    value: function getNewsFriends(id) {
      var friends = this.getIdFriendsUser(id);
      var temp_json = [];
      for (var index in friends) {
        var data = db_news.getNewsById(friends[index]);
        if (data) {
          data.name = this.getNameUser(friends[index]);
          temp_json.push(data);
        }
      }
      return temp_json;
    }
  }]);
}();
module.exports = new DatabaseUsersController(path.join(__dirname, '..', 'database_json', 'users.json'));