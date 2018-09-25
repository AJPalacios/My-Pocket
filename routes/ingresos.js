const router = require('express').Router()
const Ingreso = require ('../models/Ingreso')
const User = require ('../models/User')

router.get('/nuevo_ingreso', (req, res)=>{
  res.render ('ingresos/nuevo_ingreso')
})

// router.post ('/nuevo_ingreso', (req, res, next)=>{
//   Ingreso.create(req.body)
//   .then(ingreso =>{
//     User.findByIdAndUpdate(req.user._id,{$push:{ingreso:ingreso._id}}, {new:true})
//     .then(user=>{
//       console.log(user)
//       req.app.locals.loggedUser = user
//       res.redirect('/tablero')
//     })
//   })
// })

module.exports = router