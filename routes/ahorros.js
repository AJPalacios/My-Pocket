const router = require('express').Router()
const Ahorro = require('../models/Ahorro')
const User = require('../models/User')

//R-lista de ahorros
router.get('/list', (req, res, next)=>{
  Ahorro.find().populate('user')
    .then(ahorros=>{        
      res.render('ahorros/list',{ahorros})
      //res.send(ahorros)
    }).catch(e=>{
      console.log(e)
    })
})

//R-detalle de ahorros
router.get('/detail/:id',(req,res,next)=>{
  const {id} =req.params
  Ahorro.findById(id)
  .then(ahorro=>{
    res.render('ahorros/detail',ahorro)
  })
  .catch(e=>{
    console.log(e)
    next(e)
  })
});

//C-agregar un ahorro
router.get('/new',(req,res,next)=>{
  res.render('ahorros/new')
})
router.post('/new',(req, res, next)=>{
  if(req.body.tipoAhorro) req.body.tipo=req.body.tipoAhorro
  //console.log(req.body)
  Ahorro.create({...req.body,cantidadInicial:req.body.cantidad})
  //Ahorro.create({...req.body,owner:req.user._id})
    .then(ahorros=>{
      res.redirect('/ahorros/list')
    }).catch(e=>{
      console.log(e)
    })
})

//U-editar un ahorro
router.get('/edit/:id',(req,res,next)=>{
  const {id} =req.params
  Ahorro.findById(id)
  .then(ahorro=>{
    res.render('ahorros/edit',ahorro)
  }).catch(e=>next(e))
})
router.post('/edit/:id',(req, res, next)=>{
  const {id} = req.params
  if(req.body.tipoAhorro) req.body.tipo=req.body.tipoAhorro
  Ahorro.findByIdAndUpdate(id,{$set:req.body},{new:true})
  //Ahorro.create({...req.body,owner:req.user._id})
    .then(ahorros=>{
      res.redirect(`/ahorros/detail/${id}`)
    }).catch(e=>{
      console.log(e)
    })
})

//D-borrar un ahorro
router.get('/delete/:id',(req,res,next)=>{
  const {id}=req.params
  Ahorro.findByIdAndRemove(id)
  .then(ahorros=>{
    res.redirect('/ahorros/list')
  }).catch(e=>next(e))
})

module.exports = router