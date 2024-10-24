const express = require("express");
const server = express();
const path = require('path');

const router = require(path.join(__dirname, "routers", "index.js"));
const body_parser = require("body-parser");

const user_checker = require(path.join(__dirname, 'middleware', 'user_checker.js'))

server.use(express.static(path.join(__dirname, '..', 'client')))
server.use(express.json());
server.use(body_parser.urlencoded({ extended: true }));

server.use('/api', router);

server.set("view engine", "pug");
server.set("views", path.join(__dirname, "views"));

server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'index.html'));
});


server.get("/user/friends/:id", user_checker, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'user_page_friends.html'));
});


server.listen(3000, () => {
    console.log("Сервер запущен на 3000 порту");
})