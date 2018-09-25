const router = require('express').Router()
const User = require('../models/User')
const passport = require('../helpers/passport')


router.get('/', (req,res,next)=>{
  res.render('/users/profile.hbs')
})


module.exports = router
