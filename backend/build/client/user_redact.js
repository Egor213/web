"use strict";

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

// $(document).ready(() => {
//     // render_friends_user();
//     render_name_user();
// })
function main() {
  render_name_user();
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
main();