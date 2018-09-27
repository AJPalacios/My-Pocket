const router = require('express').Router()
const Ahorro = require('../models/Ahorro')
const User = require('../models/User')
const json2xls = require('json2xls')

const isLogged = (req,res,next)=>{
  if (req.isAuthenticated())return next()
    return res.redirect('/login')
}

//lista de ahorros
router.get('/list', isLogged, (req, res, next)=>{
  req.app.locals.loggedUser = req.user;
  Ahorro.find({usuario:req.app.locals.loggedUser})
    .then(ahorros=>{ 
      let total=0;
      ahorros.forEach(ahorro=> {
        total+=ahorro.cantidad;  
      })
      let user=req.app.locals.loggedUser.usuario;
      let photoURL=req.app.locals.loggedUser.photoURL;
      let user_id = req.user._id
      res.render('ahorros/list',{ahorros,total,user_id,user,photoURL})
    }).catch(e=>{
      console.log(e)
    })
})

//Get para la gráfica
router.get('/list-for-chart', isLogged,(req, res) => {
  req.app.locals.loggedUser = req.user;
  Ahorro.find({usuario:req.app.locals.loggedUser})
  .then(ahorros => {
    return res.json(ahorros)
  }).catch(e=>console.log(e))
})

//Detalle de ahorros
router.get('/detail/:id',isLogged,(req,res,next)=>{
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

//Añadir dinero al ahorro
router.post('/detailmas/:id',isLogged, (req, res, next) => {
  const {id} = req.params
  Ahorro.findById(id)
  .then(ahorro => {
    let total = ahorro.cantidad
    let suma = parseFloat(req.body.cantidad)
    total += suma
    console.log(typeof total)
    Ahorro.findByIdAndUpdate(id, {cantidad: total}, {new: true})
    .then(result => {
      res.redirect(`/ahorros/detail/${result._id}`)
  })
  })
})

//Retirar dinero del ahorro
router.post('/detailmenos/:id', isLogged,(req, res, next) => {
  const {id} = req.params
  Ahorro.findById(id)
  .then(ahorro => {
    let total = ahorro.cantidad
    let suma = parseFloat(req.body.cantidad)
    total -= suma
    Ahorro.findByIdAndUpdate(id, {cantidad: total}, {new: true})
    .then(result => {
      res.redirect(`/ahorros/detail/${result._id}`)
  })
  })
})

//Agregar un ahorro nuevo
router.post('/new',isLogged,(req, res, next)=>{
  if(req.body.tipoAhorro) req.body.tipo=req.body.tipoAhorro
  Ahorro.create({...req.body,cantidadInicial:req.body.cantidad,usuario:req.user._id})
    .then(ahorros=>{
      res.redirect('/ahorros/list')
    }).catch(e=>{
      console.log(e)
    })
})

//Editar un ahorro
router.get('/edit/:id',isLogged,(req,res,next)=>{
  const {id} =req.params
  req.app.locals.loggedUser = req.user;
  Ahorro.findById(id)
  .then(ahorro=>{
    console.log(ahorro)
    user=req.app.locals.loggedUser.usuario;
    res.render('ahorros/edit',{ahorro,user})
  }).catch(e=>next(e))
})

router.post('/edit/:id',isLogged,(req, res, next)=>{
  const {id} = req.params
  Ahorro.findByIdAndUpdate(id,{$set:req.body},{new:true})
    .then(ahorros=>{
      res.redirect(`/ahorros/detail/${id}`)
    }).catch(e=>{
      console.log(e)
    })
})

router.post('/edit/:id',isLogged,(req, res, next)=>{
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