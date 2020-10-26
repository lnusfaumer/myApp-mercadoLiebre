const productsList = require('../data/productsDataBase')
const fs = require('fs')
const path = require('path')

const productsController = {

  product: function (req, res, next) {
    res.render('products', { title: 'Mercado Liebre', lista: productsList })
  },

  detailProduct: function (req, res, next) {
    res.render('detailProduct', {
      title: 'Mercado Liebre', idDetail: productsList[req.params.id - 1].id, nombre: productsList[req.params.id - 1].name,
      descripcion: productsList[req.params.id - 1].description,
      foto: productsList[req.params.id - 1].image, cantidad: productsList.length + 1
    })
  },

  edit: function (req, res, next) {
    let idProduct = req.params.id
    let productToEdit = productsList[idProduct - 1]
    res.render('editProduct', { title: 'Mercado Liebre', idProduct: idProduct, productToEdit: productToEdit })
  },

  actualizar: function (req, res) {
    res.send('El envio por PUT se realizo con exito')
  },
  delete: function (req, res) {
    res.send('El envio por DELETE ')
  },

  create: function (req, res) {
    res.render('createProduct', { title: 'Mercado Liebre', cantidad: productsList.length + 1 })
  },

  store: function (req, res, next) {

    let pathFile = path.join('data','productsDataBase.json')

    let nuevoProduct = fs.readFileSync(pathFile, { encoding: 'utf-8' })

    nuevoProduct = JSON.parse(nuevoProduct)

    nuevoProduct.push({
      ...req.body,
      id: nuevoProduct[nuevoProduct.length - 1].id + 1,
      image: req.files[0].filename
    })

    nuevoProduct = JSON.stringify(nuevoProduct)

    fs.writeFileSync(pathFile, nuevoProduct)

    res.redirect('/products')
  }


}


module.exports = productsController