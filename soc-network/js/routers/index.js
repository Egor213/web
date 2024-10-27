const Router = require('express')
const router = new Router();
const path = require('path');
const admin_router = require(path.join(__dirname, 'routes', 'admin_router'));
const user_router = require(path.join(__dirname, 'routes', 'user_router'));

router.use('/admin', admin_router);
router.use('/user', user_router);

module.exports = router