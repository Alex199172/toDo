const Router = require('express')
const router = new Router()
const controller = require('../controllers/dataController')


router.post('/postList', controller.postList)
router.post('/updateList', controller.updateList)
router.post('/updateReady', controller.updateReady)
router.get('/getList', controller.getList)
router.get('/getResponsible', controller.getResponsible)

module.exports = router
