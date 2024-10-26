"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function get_id_by_url() {
  var url = window.location.pathname;
  var segments = url.split('/');
  return segments[segments.length - 1];
}
$('#friends').on('click', function () {
  var id = get_id_by_url();
  window.location.href = "/user/friends/".concat(id);
});
$('#news').on('click', function () {
  var id = get_id_by_url();
  window.location.href = "/user/news/".concat(id);
});
function main() {
  render_name_user();
  render_information();
  change_params();
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
function render_information() {
  var id = get_id_by_url();
  $.get("/api/user/get_info_user/".concat(id), function (response) {
    var user = "\n            <img src=\"".concat(response.img, "\" alt=\"\u0424\u043E\u0442\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F\" width=\"256\" height=\"256\" class=\"mb-2\">\n            <h5> id: ").concat(response.id, " </h5>\n            <h5 id='name' class='break-word'> Name: ").concat(response.name, " </h5>\n            <h5 id='date'> Date: ").concat(response.date, " </h5>\n            <h5 id='email' class='break-word'> Email: ").concat(response.email, " </h5>\n            <h5 id='role'> Role: ").concat(response.role, " </h5>\n            <h5 id='status'> Status: ").concat(response.status, " </h5>\n        ");
    $('#info').append(user);
  });
}
function change_params() {
  $('#confirm-btn').on('click', function () {
    var status = $('#status-selector').val() == "Выберите действие" ? "" : $('#status-selector').val();
    var role = $('#role-selector').val() == "Выберите действие" ? "" : $('#role-selector').val();
    var dict_status = {
      "act": "Активный",
      "lock": "Заблокированный",
      "no-сonf": "Не подтвержденный"
    };
    var dict_role = {
      "admin": "Администратор",
      "user": "Пользователь"
    };
    var name = $('#name-input').val();
    var date = $('#date-input').val();
    var email = $('#email-input').val();
    var form_data = {
      id: get_id_by_url(),
      status: dict_status[status],
      role: dict_role[role],
      name: name,
      date: date,
      email: email
    };
    $.ajax({
      url: 'http://localhost:3000/api/user/change_params/',
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(form_data),
      success: function success(response) {
        alert('Данные обновлены');
        set_new_info(form_data);
      },
      error: function error(xhr, status, _error) {
        console.log(xhr, status, _error);
        alert("Ошибка обновления данных");
      }
    });
  });
}
function set_new_info(form_data) {
  for (var key in form_data) {
    if (form_data[key] && key !== "id") {
      if (key == 'name') $($("#user-title")).text("".concat(form_data[key]));
      if (key == 'date') $("#".concat(key)).text("".concat(key.charAt(0).toUpperCase() + key.slice(1), ": ").concat(reform_date(form_data[key])));else $("#".concat(key)).text("".concat(key.charAt(0).toUpperCase() + key.slice(1), ": ").concat(form_data[key]));
    }
  }
}
function reform_date(date) {
  var _date$split = date.split('-'),
    _date$split2 = _slicedToArray(_date$split, 3),
    year = _date$split2[0],
    month = _date$split2[1],
    day = _date$split2[2];
  return "".concat(day, ".").concat(month, ".").concat(year);
}
main();