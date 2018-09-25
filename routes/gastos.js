const router = require('express').Router()
const Gasto = require('../models/Gasto')
const User = require('../models/User')

//lista de gastos
router.get('/', (req, res, next)=>{
  Gasto.find().populate('user')
    .then(gastos=>{        
      //res.render('gastos/list',{gastos})
      res.send(gastos)
    }).catch(e=>{
      console.log(e)
    })
})

//agregar un gasto
router.get('/new',(req,res,next)=>{
  res.render('gastos/new')
})
router.post('/new',(req, res, next)=>{
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

module.exports = router