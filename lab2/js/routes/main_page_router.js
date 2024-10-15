const Router = require('express')
const router = new Router()
const main_page_controller = require('../controllers/main_page_controller');


router.post('/add_book', main_page_controller.addBook);
router.delete('/delete_book', main_page_controller.deleteBook);
router.get('/filter_owner', main_page_controller.filter_owner);
router.get('/filter_ret_date', main_page_controller.filter_ret_data);

module.exports = router 