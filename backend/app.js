const express = require("express");
const server = express();
const path = require('path');

const router = require(path.join(__dirname, "routers", "index.js"));
const body_parser = require("body-parser");

server.use(express.static(path.join(__dirname, '..', 'client')))
server.use(express.json());
server.use(body_parser.urlencoded({ extended: true }));

server.use('/api', router);

server.set("view engine", "pug");
server.set("views", path.join(__dirname, "views"));

server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'index.html'));
});
server.get("/user/news/:id", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'user_page.html'));
});


server.listen(3000, () => {
    console.log("Сервер запущен на 3000 порту");
})