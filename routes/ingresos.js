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
  Ingreso.findById(id)
    .then(ingresos=>{
      res.render('ingresos/editar', ingresos)
    }).catch (error=>next(error))
})

router.post('/editar/:id', (req, res, next)=>{
  const {id} = req.params
  Ingreso.findByIdAndUpdate(id, {$set:req.body}, {new: true})
  .then(ingresos=>{
    res.redirect(`/ingresos/detalle/${id}`)
  })
  .catch(error=>next(error))
})


//BORRAR
router.get('/borrar/:id', (req, res, next)=>{
  const {id} = req.params
  Ingreso.findByIdAndRemove(id)
  .then(ingreso=>{
    res.redirect('/ingresos/lista')
  }).catch (error=>next(error))
})


module.exports = router