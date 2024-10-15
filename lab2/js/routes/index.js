const Router = require('express')
const router = new Router();
const book_card_router = require("./book_card_router");
const login_router = require("./login_router");
const main_page_router = require("./main_page_router");
const multer = require("./multer_router");
const book_page_router = require("./book_page_router");

router.use('/login', login_router);

router.use('/main_page', main_page_router);
router.use('/book', book_card_router);
router.use('/upload', multer);
router.use('/book_page', book_page_router);

module.exports = router