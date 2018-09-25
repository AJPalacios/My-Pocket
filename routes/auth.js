const router = require('express').Router()
const User = require('../models/User')
const passport = require('../helpers/passport')
const welcomeMail = require('../helpers/mailer').welcomeMail


// Rutas de registro de usuarios
router.get('/signup',(req, res, next)=>{
  res.render('auth/signup')
})


router.post('/signup',(req, res, next)=>{
  const {nombre,email} = req.body
  console.log(req.body)
  User.register(req.body, req.body.password)
    .then(user=>{
      res.redirect('/login')
    })
    .then(()=>{
      welcomeMail(nombre,email)
    })
    .catch(error=>{
      res.render('auth/signup',{data:req.body,error})
    })
})

//Rutas de login de usuarios

router.get('/login',(req, res, next)=>{
  res.render('auth/login')
})

router.post('/login',passport.authenticate('local'),(req,res)=>{
  const {email} = req.body
  //const {name} = req.name
  //req.app.locals.email = req.email
  res.render('users/profile.hbs')
  // console.log(email)
})

// Logout de usuario
router.get('/logout', (req,res,next)=>{
  req.logOut()
  req.app.locals.email = null
  res.redirect('/login')
})


module.exports = router