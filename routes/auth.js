const router = require('express').Router()
const User = require('../models/User')
const passport = require('../helpers/passport')
const sendMail = require('../helpers/mailer').welcomeMail

const isLogged = (req,res,next)=>{
  if (req.isAuthenticated())return next()
    return res.redirect('/login')

}

// Rutas de registro de usuarios
router.get('/signup',(req, res, next)=>{
  res.render('auth/signup')
})


router.post('/signup',(req, res, next)=>{
  const {nombre,email,usuario, password, confPassword } = req.body
  console.log(req.body)
  if (password !=confPassword){
    req.body.error = "Las contraseñas no coinciden";
    return res.render('auth/signup', req.body)
  }
  User.register(req.body, req.body.password)
    .then(user=>{      
        sendMail(nombre, email)
        res.redirect('/login')
    }).catch(error=>{
      res.render('auth/signup',{data:req.body,error})
    })

})

//Rutas de login de usuarios

router.get('/login',(req, res, next)=>{
  res.render('auth/login', { 'error': req.flash('error'), message: 'El usuario y/o contraseña son incorrectos.'})
})

router.post('/login',passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
}), function(req, res){
  const {_id} = req.user
  res.redirect(`/users/${_id}`)
})

// Logout de usuario
router.get('/logout', (req,res,next)=>{
  req.logOut()
  req.app.locals.email = null
  res.redirect('/login')
})


module.exports = router