const express = require("express");
const server = express();

// Подключаем папку для статических файлов
server.use(express.static("./public"));

server.set("view engine", "pug");
server.set("views", `./views`);

server.get("/", (req, res) => {
    res.render("index.pug");
});

server.listen(3000, () => {
    console.log("Сервер запущен на порту 3000");
});
