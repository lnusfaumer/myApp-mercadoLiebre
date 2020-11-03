const express = require('express');
const router = express.Router();
const path = require('path')

const validator = require('../middlewares/product-validator')

//Funcion para subir archivos
const multer = require('multer')
var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public/images/products')
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
      }
    })
    var upload = multer({ storage: storage })
const productsController = require('../controllers/productsController');

//    Ruta  http://localhost:3000/products
router.get('/', productsController.product)

//    Ruta Get y Put Edit
router.get('/edit/:id', productsController.edit)
router.put('/', productsController.actualizar)

//    Ruta http://localhost:3000/products/create
let pruebaMidd = function(req, res, next) {
    if (req.query.user == 'admin') {
      res.redirect('/')
    } else {
      next();
    }
};
router.get('/create',pruebaMidd, productsController.create)
router.post('/', upload.any(),validator, productsController.store)

//    Ruta get detail product
router.get('/:id', productsController.detailProduct)

//    Ruta delete 
router.delete('/delete/:id', productsController.delete)


module.exports = router;
