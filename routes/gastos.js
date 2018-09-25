const router = require('express').Router()
const Gasto = require('../models/Gasto')
const User = require('../models/User')

//lista de gastos
router.get('/list', (req, res, next)=>{
  Gasto.find().populate('user')
    .then(gastos=>{        
      res.render('gastos/list',{gastos})
      //res.send(gastos)
    }).catch(e=>{
      console.log(e)
    })
})

//agregar un gasto
router.get('/new',(req,res,next)=>{
  res.render('gastos/new')
})
router.post('/new',(req, res, next)=>{
  if(req.body.tipoGasto) req.body.tipo=req.body.tipoGasto
  console.log(req.body)
  Gasto.create(req.body)
  //Gasto.create({...req.body,owner:req.user._id})
    .then(gastos=>{
      //res.redirect('/gastos')
      res.send(gastos)
    }).catch(e=>{
      console.log(e)
    })
})

//detalle de gastos
router.get('/detail/:id',(req,res,next)=>{
  const {id} =req.params
  Gasto.findById(id)
  .then(gasto=>{
    res.render('gastos/detail',gasto)
  })
  .catch(e=>{
    console.log(e)
    next(e)
  })
});

module.exports = router