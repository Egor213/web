const Router = require('express')
const router = new Router()
const book_card_controller = require('../controllers/book_card_controller');

router.get('/all', book_card_controller.getAllBook);
router.put('/change_author', book_card_controller.changeAuthor);
router.put('/change_title', book_card_controller.changeTitle);
router.put('/set_owner', book_card_controller.setOwner);
router.delete('/delete_owner', book_card_controller.deleteOwner);
router.delete('/delete_return_data', book_card_controller.deleteReturnData);
router.put('/set_return_data', book_card_controller.setReturnData);
router.get('/:id', book_card_controller.getBook);

book_card_controller
module.exports = router;