const router = require('express').Router()
const User = require('../models/User')
const passport = require('../helpers/passport')

const multer = require('multer')
const uploads = multer({dest:'public/uploads'})
const uploadCloud =require('../helpers/cloudinary')

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


//foto de perffil

// router.get('/users/edit/:id', (req, res, next)=>{
//   User.findById(req.user._id)
//     .then(user=>{
//       res.render(`users/edit/${_id}`,user)
//     }).catch(e=>next(e))
// })

// router.post('/users/edit',uploadCloud.single('image'), (req, res, next)=>{
//   if(req.file)req.body['photoURL'] = req.file.url 
//   //`uploads/${req.file.filename}`
//   User.findByIdAndUpdate(req.user._id,{$set:req.body},{new: true})
//     .then(user=>{
//       res.redirect('/profile')
//     }).catch(e=>next(e))
// })



module.exports = router
