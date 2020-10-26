var express = require('express');
var router = express.Router();

const productsCont = require('../controllers/productsController');

router.get('/', productsCont.product)

router.get('/edit/:id', productsCont.edit)
router.put('/:id/actualizar', productsCont.actualizar)


router.get('/create', productsCont.create)
router.post('/store', productsCont.store)
router.get('/:id', productsCont.detailProduct)

router.delete('/delete/:id', productsCont.delete)


module.exports = router;
