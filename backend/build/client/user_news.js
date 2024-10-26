"use strict";

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function get_id_by_url() {
  var url = window.location.pathname;
  var segments = url.split('/');
  return segments[segments.length - 1];
}
$('#friends').on('click', function () {
  var id = get_id_by_url();
  window.location.href = "/user/friends/".concat(id);
});
$('#redact').on('click', function () {
  var id = get_id_by_url();
  window.location.href = "/user/redact/".concat(id);
});
function main() {
  render_name_user();
  render_news_user();
}
function add_name_user(name) {
  $("#user-title").text(name);
}
function render_name_user() {
  var id = get_id_by_url();
  $.get("/api/user/get_name/".concat(id), function (response) {
    add_name_user(response);
  });
}
function render_news_user() {
  var id = get_id_by_url();
  $.get("/api/user/news/".concat(id), function (response) {
    add_all_news(response);
  }).fail(function (res) {
    $('#news').append("\n            <div class=\"col-12 d-flex justify-content-center\">\n                <h2>\u041D\u043E\u0432\u043E\u0441\u0442\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B</h2>\n            </div>\n            ");
  });
}
function add_all_news(all_news) {
  var _iterator = _createForOfIteratorHelper(all_news),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var news = _step.value;
      var _iterator2 = _createForOfIteratorHelper(news.posts),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var element = _step2.value;
          add_news_user(news.name, element, news.img);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
function add_news_user(name, news, img) {
  var data = "\n        <div class=\"col-12 d-flex justify-content-center\">\n            <div class=\"card m-2 card-custom-width\">\n                <div class=\"card-body\">\n                    <img src=\"".concat(img, "\" alt=\"\u0424\u043E\u0442\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F\" width=\"48\" height=\"48\" class=\"mb-2\">\n                    <h2 class=\"card-title\">").concat(name, "</h2>\n                    <p class=\"card-text\">").concat(news, "</p>\n                </div>\n            </div>\n        </div>\n    ");
  $('#news').append(data);
}
main();