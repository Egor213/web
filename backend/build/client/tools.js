"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get_id_by_url = get_id_by_url;
function get_id_by_url() {
  var url = window.location.pathname;
  var segments = url.split('/');
  return segments[segments.length - 1];
}