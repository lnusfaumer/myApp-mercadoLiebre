var express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const registerValidation = require('../middlewares/register-valid')


//    Ruta http://localhost:3000/users
router.get('/', usersController.user)

//    Ruta http://localhost:3000/users/register
router.get('/register', usersController.register)
router.post('/', registerValidation, usersController.userCreate)

//    Ruta http://localhost:3000/users/login
router.get('/login', usersController.login)



module.exports = router;