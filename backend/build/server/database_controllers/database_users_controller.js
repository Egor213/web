"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
    key: "getImgUser",
    value: function getImgUser(id) {
      var user = this.getUserById(id);
      if (user) return user.img;
      return false;
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
          data.img = this.getImgUser(friends[index]);
          temp_json.push(data);
        }
      }
      return temp_json;
    }
  }, {
    key: "saveJsonData",
    value: function saveJsonData(json_data) {
      try {
        var data = {
          users: json_data
        };
        fs.writeFileSync(this.path, JSON.stringify(data, null, 2), 'utf8');
        return true;
      } catch (err) {
        console.error('Ошибка при сохранении данных:', err);
        return false;
      }
    }
  }, {
    key: "isValidDate",
    value: function isValidDate(date_string) {
      var regex = /^\d{4}\-\d{2}\-\d{2}$/;
      if (!regex.test(date_string)) {
        return false;
      }
      var parts = date_string.split('-');
      var year = parseInt(parts[0], 10);
      var month = parseInt(parts[1], 10);
      var day = parseInt(parts[2], 10);
      if (month < 1 || month > 12) return false;
      var days_in_month = new Date(year, month, 0).getDate();
      return day > 0 && day <= days_in_month && year < 2024 && year > 1850;
    }
  }, {
    key: "changeParam",
    value: function changeParam(value_obj, id) {
      if (!value_obj || !id) {
        console.error('Неверное значение value: ', value_obj, " id: ", id);
        return false;
      }
      var data = this.getArrData();
      var _iterator = _createForOfIteratorHelper(data),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var user = _step.value;
          if (user.id == id) {
            for (var key in value_obj) {
              if (value_obj[key]) {
                console.log(value_obj[key]);
                if (key === 'date') {
                  if (this.isValidDate(value_obj[key])) user[key] = value_obj[key];else return false;
                } else user[key] = value_obj[key];
              }
            }
            if (this.saveJsonData(data)) return true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return false;
    }
  }]);
}();
module.exports = new DatabaseUsersController(path.join(__dirname, '..', 'database_json', 'users.json'));