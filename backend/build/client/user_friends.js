"use strict";

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function get_id_by_url() {
  var url = window.location.pathname;
  var segments = url.split('/');
  return segments[segments.length - 1];
}
$(document).ready(function () {
  render_friends_user();
  render_name_user();
});
$('#news').on('click', function () {
  var id = get_id_by_url();
  window.location.href = "/user/news/".concat(id);
});
$('#redact').on('click', function () {
  var id = get_id_by_url();
  window.location.href = "/user/redact/".concat(id);
});
function render_friends_user() {
  var id = get_id_by_url();
  $.get("/api/user/friends/".concat(id), function (response) {
    add_friends(response);
  }).fail(function (res) {
    $('#user').append("\n            <div class=\"col-12 d-flex justify-content-center\">\n                <h2 class=\"card-title\">\u0414\u0440\u0443\u0437\u0435\u0439 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E</h2>\n            </div>");
  });
}
function render_name_user() {
  var id = get_id_by_url();
  $.get("/api/user/get_name/".concat(id), function (response) {
    add_name_user(response);
  });
}
function add_name_user(name) {
  $("#user-title").text(name);
}
function add_friends(friends) {
  var _iterator = _createForOfIteratorHelper(friends),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var friend = _step.value;
      var data = "\n            <div class=\"col-12 d-flex justify-content-center\">\n                <div class=\"card m-2 card-custom-width\">\n                    <div class=\"card-body\">\n                        <h2 class=\"card-title\">\u0418\u043C\u044F: ".concat(friend['name'], "</h2>\n                        <p class=\"card-text\">\u0414\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F: ").concat(friend['date'], "</p>\n                        <p class=\"card-text\">\u041F\u043E\u0447\u0442\u043E\u0432\u044B\u0439 \u0430\u0434\u0440\u0435\u0441: ").concat(friend['email'], "</p>\n                        <p class=\"card-text\">\u0420\u043E\u043B\u044C: ").concat(friend['role'], "</p>\n                        <p class=\"card-text\">\u0421\u0442\u0430\u0442\u0443\u0441: ").concat(friend['status'], "</p>\n                        <p class=\"card-text\">id \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0435: ").concat(friend['id'], "</p>\n                    </div>\n                </div>\n            </div>\n\n        ");
      $('#user').append(data);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}