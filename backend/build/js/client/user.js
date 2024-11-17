"use strict";

$(document).ready(function () {
  render_news_user();
});
function render_news_user() {
  var id = get_id_by_url();
  $.get("/api/user/news/".concat(id), function (response) {
    console.log(response);
  });
}
function get_id_by_url() {
  var url = window.location.pathname;
  var segments = url.split('/');
  return segments[segments.length - 1];
}