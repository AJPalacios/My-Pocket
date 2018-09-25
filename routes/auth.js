const router = require('express').Router()
const User = require('../models/User')
const passport = require('../helpers/passport')
const welcomeMail = require('../helpers/mailer').welcomeMail


//signup
router.get('/signup',(req, res, next)=>{
  res.render('auth/signup')
})

//login

router.get('/login',(req, res, next)=>{
  res.render('auth/login')
})


module.exports = router