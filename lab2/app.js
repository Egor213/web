const express = require("express");
const server = express();

const router = require('./js/routes/index');
const bodyParser = require('body-parser');
let database_users = require('./database/database_users_controller');
let database_books = require('./database/database_books_controller');
server.use(express.static("./public"));
server.use(express.json());





server.use(bodyParser.urlencoded({ extended: true }));
server.use('/api', router);

server.set("view engine", "pug");
server.set("views", `./views`);




server.get("/", (req, res) => {
    res.render("index.pug");
});

server.get("/main_page", (req, res) => {
    res.render("main_page.pug")
});





server.listen(3000, () => {
    console.log("Сервер запущен на порту 3000");
});

