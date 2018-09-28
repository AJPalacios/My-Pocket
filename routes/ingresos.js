const router = require('express').Router()
const Ingreso = require ('../models/Ingreso')
const User = require ('../models/User')

const isLogged = (req,res,next)=>{
  if (req.isAuthenticated())return next()
    return res.redirect('/login')
}

//LISTA DE INGRESOS
router.get('/list', isLogged,(req, res, next)=>{
  req.app.locals.loggedUser = req.user
  let user = req.user.usuario
  let user_id = req.user._id
  console.log(user_id)
  Ingreso.find({usuario:req.app.locals.loggedUser})
  .then (ingresos=>{
    res.render('ingresos/list', {ingresos,user_id,user})
  }) .catch(e=>console.log(e))
})

router.get('/list-for-chart', isLogged,(req, res) => {
  req.app.locals.loggedUser = req.user;
  Ingreso.find({usuario:req.app.locals.loggedUser})//.populate('user')
  .then(ingresos => {
    return res.json(ingresos)
  }).catch(e=>console.log(e))
})

//DETALLE DE INGRESO
router.get('/detail/:id', isLogged,(req, res, next)=>{
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
router.post('/new',isLogged,(req, res, next)=>{
  console.log(req.body)
  Ingreso.create({...req.body,usuario:req.user._id})
    .then(ahorros=>{
      res.redirect('/ingresos/list')
    }).catch(e=>{
      console.log(e)
    })
})

//EDITAR

router.get('/edit/:id',isLogged, (req, res, next)=>{
  const {id} = req.params
  Ingreso.findById(id)
    .then(ingresos=>{
      res.render('ingresos/edit', ingresos)
    }).catch (error=>next(error))
})

router.post('/edit/:id', isLogged,(req, res, next)=>{
  const {id} = req.params
  Ingreso.findByIdAndUpdate(id, {$set:req.body}, {new: true})
  .then(ingresos=>{
    res.redirect(`/ingresos/detail/${id}`)
  })
  .catch(error=>next(error))
})


//BORRAR
router.get('/delete/:id', isLogged,(req, res, next)=>{
  const {id} = req.params
  Ingreso.findByIdAndRemove(id)
  .then(ingreso=>{
    res.redirect('/ingresos/list')
  }).catch (error=>next(error))
})


module.exports = router