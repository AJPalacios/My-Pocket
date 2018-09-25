const router = require('express').Router()
const Ingreso = require ('../models/Ingreso')
const User = require ('../models/User')


//NUEVO INGRESO
router.get('/new', (req, res)=>{
  res.render ('ingresos/new')
})

router.post ('/new', (req, res, next)=>{
  Ingreso.create(req.body)
  .then(ingreso =>{
    res.redirect('/ingresos/lista')
  }).catch(e=>console.log(e))
})

//LISTA DE INGRESOS
router.get('/lista', (req, res, next)=>{
  Ingreso.find()
  .then (ingresos=>{
    res.render('ingresos/lista', {ingresos})
  }) .catch(e=>console.log(e))
})


//DETALLE DE INGRESO

router.get('/detalle/:id', (req, res, next)=>{
  const {id} = req.params
  Ingreso.findById(id)
  .then(ingresos=>{
    res.render('ingresos/detalle',ingresos)
  })
  .catch(e=>console.log(e)) 
})


//EDITAR

router.get('/editar/:id', (req, res, next)=>{
  const {id} = req.params
  Book.findById(id)
    .then(book=>{
      res.render('book-edit-form', book)
    })
    .catch (error=>next(error))
})

router.post('/edit/:id', (req, res, next)=>{
  const {id} = req.params
  Book.findByIdAndUpdate(id, {$set:req.body}, {new: true})
  .then(book=>{
    console.log(book)
    res.redirect(`/books/detail/${id}`)
  })
  .catch (error=>next(error))
})


//BORRAR
router.get('/borrar/:id', (req, res, next)=>{
  const {id} = req.params
  Book.deleteOne(id)
})


module.exports = router