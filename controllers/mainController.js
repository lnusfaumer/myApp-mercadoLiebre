
const productsList = require('../data/productsDataBase')

const mainController = {
             
       home: function(req, res, next) {
            res.render('index', {title: 'Mercado Liebre', lista: productsList}) 
      },

}
module.exports = mainController