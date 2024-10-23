const Router = require('express')
const router = new Router()
const path = require('path')
const admin_controller = require(path.join(__dirname, '..', 'controllers', 'admin_controller'))

router.get('/', admin_controller.renderMainPage)

module.exports = router;