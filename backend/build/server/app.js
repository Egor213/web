"use strict";

var express = require("express");
var server = express();
var path = require('path');
var router = require(path.join(__dirname, "routers", "index.js"));
var body_parser = require("body-parser");
var user_checker = require(path.join(__dirname, 'middleware', 'user_checker.js'));
server.use(express["static"](path.join(__dirname, '..', 'client')));
server.use(express.json());
server.use(body_parser.urlencoded({
  extended: true
}));
server.use('/api', router);
server.set("view engine", "pug");
server.set("views", path.join(__dirname, "views"));

//Main routes
server.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'html', 'index.html'));
});
server.get("/user/friends/:id", user_checker, function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'html', 'user_page_friends.html'));
});
server.get("/user/news/:id", user_checker, function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'html', 'user_page_news.html'));
});
server.get("/user/redact/:id", user_checker, function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'html', 'user_page_redact.html'));
});
server.listen(3000, function () {
  console.log("Сервер запущен на 3000 порту");
});