const router = require('express').Router()
const Ingreso = require ('../models/Ingreso')
const User = require ('../models/User')

//LISTA DE INGRESOS
router.get('/list', (req, res, next)=>{
  Ingreso.find()
  .then (ingresos=>{
    res.render('ingresos/list', {ingresos})
  }) .catch(e=>console.log(e))
})

//DETALLE DE INGRESO
router.get('/detail/:id', (req, res, next)=>{
  const {id} = req.params
  Ingreso.findById(id)
  .then(ingresos=>{
    res.render('ingresos/detail',ingresos)
  })
  .catch(e=>{
    console.log(e)
    next(e)
  }) 
})


//NUEVO INGRESO
router.post('/new',(req, res, next)=>{
  console.log(req.body)
  Ingreso.create(req.body)
    .then(ahorros=>{
      res.redirect('/ingresos/list')
    }).catch(e=>{
      console.log(e)
    })
})

//EDITAR

router.get('/edit/:id', (req, res, next)=>{
  const {id} = req.params
  Ingreso.findById(id)
    .then(ingresos=>{
      res.render('ingresos/edit', ingresos)
    }).catch (error=>next(error))
})

router.post('/edit/:id', (req, res, next)=>{
  const {id} = req.params
  Ingreso.findByIdAndUpdate(id, {$set:req.body}, {new: true})
  .then(ingresos=>{
    res.redirect(`/ingresos/detail/${id}`)
  })
  .catch(error=>next(error))
})


//BORRAR
router.get('/delete/:id', (req, res, next)=>{
  const {id} = req.params
  Ingreso.findByIdAndRemove(id)
  .then(ingreso=>{
    res.redirect('/ingresos/list')
  }).catch (error=>next(error))
})


module.exports = router