const router = require('express').Router()
const Diario = require('../models/Diario')
const User = require('../models/User')

//R-lista de diarios
router.get('/list', (req, res, next)=>{
  Diario.find().populate('user')
    .then(diarios=>{        
      res.render('diarios/list',{diarios})
      //res.send(diarios)
    }).catch(e=>{
      console.log(e)
    })
})

//R-detalle de diarios
router.get('/detail/:id',(req,res,next)=>{
  const {id} =req.params
  Diario.findById(id)
  .then(diario=>{
    res.render('diarios/detail',diario)
  })
  .catch(e=>{
    console.log(e)
    next(e)
  })
});

//C-agregar un diario
router.get('/new',(req,res,next)=>{
  res.render('diarios/new')
})
router.post('/new',(req, res, next)=>{
  if(req.body.tipoDiario) req.body.tipo=req.body.tipoDiario
  //console.log(req.body)
  Diario.create(req.body)
  //Diario.create({...req.body,owner:req.user._id})
    .then(diarios=>{
      res.redirect('/diarios/list')
    }).catch(e=>{
      console.log(e)
    })
})

//U-editar un diario
router.get('/edit/:id',(req,res,next)=>{
  const {id} =req.params
  Diario.findById(id)
  .then(diario=>{
    res.render('diarios/edit',diario)
  }).catch(e=>next(e))
})
router.post('/edit/:id',(req, res, next)=>{
  const {id} = req.params
  if(req.body.tipoDiario) req.body.tipo=req.body.tipoDiario
  Diario.findByIdAndUpdate(id,{$set:req.body},{new:true})
  //Diario.create({...req.body,owner:req.user._id})
    .then(diarios=>{
      res.redirect(`/diarios/detail/${id}`)
    }).catch(e=>{
      console.log(e)
    })
})

//D-borrar un diario
router.get('/delete/:id',(req,res,next)=>{
  const {id}=req.params
  Diario.findByIdAndRemove(id)
  .then(diarios=>{
    res.redirect('/diarios/list')
  }).catch(e=>next(e))
})

module.exports = router