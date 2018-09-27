const router = require('express').Router()
const Gasto = require('../models/Gasto')
const User = require('../models/User')

//R-lista de gastos
router.get('/list', (req, res, next)=>{
  req.app.locals.loggedUser = req.user;
  Gasto.find({usuario:req.app.locals.loggedUser})//.populate('user')
    .then(gastos=>{        
      res.render('gastos/list',{gastos})
      //res.send(gastos)
    }).catch(e=>{
      console.log(e)
    })
})

router.get('/list-for-chart', (req, res) => {
  req.app.locals.loggedUser = req.user;
  Gasto.find({usuario:req.app.locals.loggedUser})//.populate('user')
  .then(gastos => {
    return res.json(gastos)
  }).catch(e=>console.log(e))
})

//R-detalle de gastos
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

//C-agregar un gasto
router.get('/new',(req,res,next)=>{
  res.render('gastos/new')
})
router.post('/new',(req, res, next)=>{
  if(req.body.tipoGasto) req.body.tipo=req.body.tipoGasto
  //console.log(req.body)
  Gasto.create(req.body)
  //Gasto.create({...req.body,owner:req.user._id})
    .then(gastos=>{
      res.redirect('/gastos/list')
    }).catch(e=>{
      console.log(e)
    })
})

//U-editar un gasto
router.get('/edit/:id',(req,res,next)=>{
  const {id} =req.params
  Gasto.findById(id)
  .then(gasto=>{
    res.render('gastos/edit',gasto)
  }).catch(e=>next(e))
})
router.post('/edit/:id',(req, res, next)=>{
  const {id} = req.params
  if(req.body.tipoGasto) req.body.tipo=req.body.tipoGasto
  Gasto.findByIdAndUpdate(id,{$set:req.body},{new:true})
  //Gasto.create({...req.body,owner:req.user._id})
    .then(gastos=>{
      res.redirect(`/gastos/detail/${id}`)
    }).catch(e=>{
      console.log(e)
    })
})

//D-borrar un gasto
router.get('/delete/:id',(req,res,next)=>{
  const {id}=req.params
  Gasto.findByIdAndRemove(id)
  .then(gastos=>{
    res.redirect('/gastos/list')
  }).catch(e=>next(e))
})

module.exports = router