const router = require('express').Router()
const User = require('../models/User')
const multer = require('multer')
const uploads = multer({dest:'public/uploads'})
const uploadCloud =require('../helpers/cloudinary')


router.get('/', (req, res, next)=>{
  User.findById(req.user._id)
    .then(user=>{
      res.render('users/profile',user)
    }).catch(e=>next(e))
})

router.get('/edit', (req, res, next)=>{
  User.findById(req.user._id)
    .then(user=>{
      res.render('users/edit',user)
    }).catch(e=>next(e))
})

router.post('/edit',uploadCloud.single('image'), (req, res, next)=>{
  // console.log(req.body)
  // console.log(req.file)
  if(req.file)req.body['photoURL'] = req.file.url 
  //`uploads/${req.file.filename}`
  User.findByIdAndUpdate(req.user._id,{$set:req.body},{new: true})
    .then(user=>{
      res.redirect('/profile')
    }).catch(e=>next(e))
})



module.exports = router