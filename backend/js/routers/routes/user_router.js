const Router = require('express')
const router = new Router()
const path = require('path')
const user_controller = require(path.join(__dirname, '..', 'controllers', 'user_controller'))

router.get('/news/:id', user_controller.renderUserNews);
router.get('/friends/:id', user_controller.renderUserFriends);

module.exports = router;