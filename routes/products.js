const express = require('express');
const router = express.Router();
const path = require('path')

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

router.get('/', productsController.product)

router.get('/edit/:id', productsController.edit)
router.put('/', productsController.actualizar)

router.get('/create', productsController.create)
router.post('/', upload.any(), productsController.store)

router.get('/:id', productsController.detailProduct)

router.delete('/delete/:id', productsController.delete)


module.exports = router;
