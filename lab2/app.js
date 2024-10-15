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


const fs = require('fs');

function get_login_from_json() {
    const filePath = "./js/controllers/cur_session.json"

    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData.login;
    } catch (error) {

        return null;
    }
}




server.get("/main_page", (req, res) => {
    res.render("main_page.pug", { login: get_login_from_json()})
});


server.listen(3000, () => {
    console.log("Сервер запущен на порту 3000");
});

