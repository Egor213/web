const Router = require('express')
const router = new Router();
const path = require('path');
const admin_router = require(path.join(__dirname, 'routes', 'admin_router'));

router.use('/admin', admin_router);


module.exports = router