const usersList = require('../data/usersDataBase')

module.exports = {
      user: function (req, res, next){

            res.render('users/users', {name: {}})
      },
      register: function (req, res, next){

            res.render('./users/register')
      },
      registerSent:function (req, res, next){
            let name = req.body.name
            res.redirect('/users', {name: name})
      },
      login:function (req, res, next){

            res.render('./users/login')
      }
}