var express = require('express');
var router = express.Router();

const productsController = require('../controllers/productsController');

router.get('/', productsController.product)

router.get('/edit/:id', productsController.edit)
router.put('/:id/actualizar', productsController.actualizar)


router.get('/create', productsController.create)
router.post('/store', productsController.store)
router.get('/:id', productsController.detailProduct)

router.delete('/delete/:id', productsController.delete)


module.exports = router;
