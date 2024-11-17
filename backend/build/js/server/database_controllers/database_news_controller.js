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
var DatabaseNewsController = /*#__PURE__*/function () {
  function DatabaseNewsController(path_database) {
    _classCallCheck(this, DatabaseNewsController);
    this.path = path_database;
  }
  return _createClass(DatabaseNewsController, [{
    key: "getArrData",
    value: function getArrData() {
      try {
        var data = fs.readFileSync(this.path, 'utf8');
        var json_data = JSON.parse(data);
        return json_data['news'];
      } catch (e) {
        console.error("Ошибка при открытий JSON файла");
        return false;
      }
    }
  }, {
    key: "getAllNews",
    value: function getAllNews() {
      return this.getArrData();
    }
  }, {
    key: "getNewsById",
    value: function getNewsById(id) {
      var data = this.getArrData();
      for (var index in data) {
        if (id == data[index].id) return data[index];
      }
      return false;
    }
  }]);
}();
module.exports = new DatabaseNewsController(path.join(__dirname, '..', 'database_json', 'news.json'));