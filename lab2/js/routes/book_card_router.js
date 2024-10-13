const Router = require('express')
const router = new Router()
const book_card_controller = require('../controllers/book_card_controller');


router.get('/:id', book_card_controller.getBook);


module.exports = router;