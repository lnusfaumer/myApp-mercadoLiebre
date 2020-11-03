const productsList = require('../data/productsDataBase')
const fs = require('fs')
const path = require('path')
const {validationResult} = require('express-validator')

const productsController = {

  product: function (req, res, next) {
    res.render('products/products', { lista: productsList })
  },

  detailProduct: function (req, res, next) {
    let dato = productsList[req.params.id - 1]
    res.render('products/detailProduct', { idDetail: dato.id, nombre: dato.name,
      descripcion: dato.description,
      foto: dato.image, cantidad: productsList.length + 1, precio: dato.price, categoria: dato.category
    })
  },

  edit: function (req, res, next) {
    let idProduct = req.params.id
    let productToEdit = productsList[idProduct - 1]
    res.render('products/editProduct', { idProduct: idProduct, productToEdit: productToEdit })
  },

  actualizar: function (req, res) {
    res.send('El envio por PUT se realizo con exito')
  },
  delete: function (req, res) {
    res.send('El envio por DELETE ')
  },

  create: function (req, res) {
    res.render('products/createProduct', { title: 'Mercado Liebre', 
    data:{},
    errors: {},
  })

  },

  store: function (req, res, next) {

    // verificar el resultado de la validacion

    let errors = validationResult(req)

    if(!errors.isEmpty() ){
      return res.render('products/createProduct', {
        errors: errors.mapped(),
        data : req.body,
      })
    }

      // Traer products.json a una variable

    let pathFile = path.join('data','productsDataBase.json')

    let nuevoProduct = fs.readFileSync(pathFile, { encoding: 'utf-8' })

    // Convertir el string en array/json 
    nuevoProduct = JSON.parse(nuevoProduct)

   // agregar al array el producto nuevo

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