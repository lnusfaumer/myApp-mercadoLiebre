const {check, body} = require('express-validator')
const fs = require('fs')


module.exports = [
      check('name').isLength({min:1}).withMessage('Campo incompleto'),

      check('email')
      .isEmail().withMessage('No es un email valido'),

      check('password')
      .isLength({min:8}).withMessage('Su clave debe tener almenos 8 caracteres'),
      check('password')
      .isAlphanumeric().withMessage('Su clave debe contener numeros y letras'),

      body('passwordRepeat')
      .isLength({min:8}).withMessage('Campo incompleto')
      .isAlphanumeric().withMessage('Repetir clave'),

      check('image').isLength({min:1}).withMessage('Este campo debe estar completo'),

      body('email').custom(function(value){
            let usersJSON = fs.readFileSync('data/usersDataBase.json', {encoding: 'utf-8'})
            let users;
            if (usersJSON == " "){
                  users = [];
            }else{
                  users = JSON.parse(usersJSON);
            }
            for(let i = 0; i < users.length; i++){
                  if (users[i].email == value){
                        return false
                  }
            }
            return true 
      }).withMessage('Email ya registrado')

]