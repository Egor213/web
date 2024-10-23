const express = require("express");
const server = express();
const path = require('path');

const router = require(path.join(__dirname, "js", "routers", "index.js"));
const body_parser = require("body-parser");

// server.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'public')))
server.use(express.static(path.join(__dirname, 'static')))
server.use(express.json());
server.use(body_parser.urlencoded({ extended: true }));

server.use('/api', router);

server.set("view engine", "pug");
server.set("views", path.join(__dirname, "views"));

server.get("/", (req, res) => {
    res.render("index.pug");
});


server.listen(3000, () => {
    console.log("Сервер запущен на 3000 порту");
})