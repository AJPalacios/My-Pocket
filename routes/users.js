const router = require('express').Router()
const User = require('../models/User')
const passport = require('../helpers/passport')

const isLogged = (req,res,next)=>{
  if (req.isAuthenticated())return next()
    return res.redirect('/login')

}

router.get('/:id',isLogged, (req,res,next)=>{
  const {id} = req.params

  console.log(req.params)
  User.findById(id)
  .then(user=>{
    console.log(user)
    res.render('users/profile',user)
  })
  .catch(err=>{
    next(err)
  })
})




module.exports = router
