const router = require('express').Router()
const User = require('../models/User')
const passport = require('../helpers/passport')


router.get('/:email', (req,res,next)=>{
  const {email} = req.params
  User.findOne({email})
  .then(user=>{
    console.log(user)
    res.render('users/profile',user)
  })
  .catch(err=>{
    next(err)
  })
})


module.exports = router
