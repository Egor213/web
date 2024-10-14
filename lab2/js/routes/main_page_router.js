const Router = require('express')
const router = new Router()
const main_page_controller = require('../controllers/main_page_controller');


router.post('/add_book', main_page_controller.addBook);
router.delete('/delete_book', main_page_controller.deleteBook);


module.exports = router 