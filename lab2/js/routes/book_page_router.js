const Router = require('express')
const router = new Router()
const book_page_controller = require('../controllers/book_page_controller');

router.get('/', book_page_controller.render_page);

module.exports = router;