const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const {check} = require('express-validator')




router.post('/registration', controller.registration)
  check('login', 'Error').notEmpty().isLength({ min: 3 }).trim().escape(),
  check('password', 'Error').notEmpty().trim().escape(),
  check('name', 'Error').notEmpty().trim().escape()
  check('surname', 'Error').notEmpty().trim().escape()
  check('patronymic', 'Error').notEmpty().trim().escape()
router.post('/login', controller.login)
  check('password', 'Error').notEmpty().trim().escape(),
  check('login', 'Error').notEmpty().trim().escape()

module.exports = router
