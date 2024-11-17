"use strict";

$(document).ready(function () {
  render_all_users();
});
function render_all_users() {
  $.get('/api/admin', function (response) {
    render_cards_users(response);
  });
}
function render_cards_users(users) {
  for (var index in users) {
    var user = "\n            <div class=\"col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center\">\n                <div class=\"card m-2 w-100\">\n                    <div class=\"card-body\">\n                        <h4 class=\"card-title\">\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C ".concat(users[index]['id'], "</h2>\n                        <p class=\"card-text\">\u0418\u043C\u044F: ").concat(users[index]['name'], "</p>\n                        <p class=\"card-text\">\u0414\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F: ").concat(users[index]['date'], "</p>\n                        <p class=\"card-text\">email: ").concat(users[index]['email'], "</p>\n                        <p class=\"card-text\">\u0420\u043E\u043B\u044C: ").concat(users[index]['role'], "</p>\n                        <p class=\"card-text\">\u0421\u0442\u0430\u0442\u0443\u0441: ").concat(users[index]['status'], "</p>\n                        <a class=\"btn btn-primary\" href=\"/user/friends/").concat(users[index]['id'], "\"'>\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435</a>\n                    </div>\n                </div>\n            </div>\n         ");
    $('#users').append(user);
  }
}