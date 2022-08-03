const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const config = require('./../../knexfile');
const knex = require('knex')(config.development)
const {secret} = require('./../../configJWT')

const generateAccessToken = (id, login) => {
  const payload = {
    id,
    login
  }
  return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class authController {
    async registration(req, res) {

      try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({message: 'Ошибка регистрации'})
      }
      console.log(req.body);
      const candidate = await knex.select('login').where('login','=', req.body.login).from('users')
      console.log(candidate);
        if(candidate.length > 0) {
          return res.status(400).json({message: 'Пользователь с таким логином уже существует'})
        }
        const hashPassword = await bcrypt.hash(req.body.password, 5);
        await knex('users').insert({
          login: req.body.login,
          name: req.body.name,
          surname: req.body.surname,
          patronymic: req.body.patronymic,
          password: hashPassword,
          role_id: 1,
        })
        return res.json({message: 'Регистрация прошла успешно'})
      } catch(event) {
          console.log(event)
          res.status(400).json({message: 'Ошибка регистрации'})
      }
    }

    async login(req, res) {

      try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(400).json({message: 'Ошибка авторизации'})
        }
          const {login, password, role_id} = req.body
          const row = await knex.select('*').where('login','=', req.body.login).from('users')
          console.log(req.headers.authorization.split(' ')[1]);

          if(row.length <= 0) {
          return res.status(400).json({message: `${login} не найден`})
          }
        const validPassword = await bcrypt.compare(password, row[0].password)

        if(!validPassword) {
            return res.status(400).json({message: 'Некорректный пароль'})
        }
        const token = generateAccessToken(row[0].id, row[0].login)
        return res.json({token, 'id':row[0].id, 'login':row[0].login,'role_id':row[0].role_id,'surname':row[0].surname})
      } catch(event) {
          console.log(event)
          res.status(400).json({message: 'Ошибка логина'})
          }
      }

  }

module.exports = new authController()
