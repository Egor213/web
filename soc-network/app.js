const express = require("express");
const server = express();
const path = require('path');
const fs = require("fs");
const {createServer} = require("https");

const router = require(path.join(__dirname, "js", "routers", "index.js"));
const body_parser = require("body-parser");

const user_checker = require(path.join(__dirname, "js", 'middleware', 'user_checker.js'))

server.use('/', express.static(path.join(__dirname, 'build', 'client')))
server.use('/st2', express.static(path.join(__dirname, 'static')));
server.use(express.json());
server.use(body_parser.urlencoded({ extended: true }));

server.use('/api', router);

server.set("view engine", "pug");
server.set("views", path.join(__dirname, "views"));


const https_options = {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'test.key'), 'utf-8'),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'test.crt'), 'utf-8')
};

//Main routes
server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'html', 'index.html'));
});


server.get("/user/friends/:id", user_checker, (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'html', 'user_page_friends.html'));
});

server.get("/user/news/:id", user_checker, (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'html', 'user_page_news.html'));
});

server.get("/user/redact/:id", user_checker, (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'html', 'user_page_redact.html'));
});


const SERVER = createServer(https_options, server);

SERVER.listen(3000, () => {
    console.log("Сервер запущен на 3000 порту");
})