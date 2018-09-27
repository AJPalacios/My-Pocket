const router = require('express').Router()
const Meta = require('../models/Meta')
const User = require('../models/User')

const isLogged = (req,res,next)=>{
  if (req.isAuthenticated())return next()
    return res.redirect('/login')
}

//R-lista de metas
router.get('/list', isLogged, (req, res, next)=>{
  req.app.locals.loggedUser = req.user;
  Meta.find({usuario:req.app.locals.loggedUser})
    .then(metas=>{ 
      let total=0;
      metas.forEach(meta=> {
        total+=meta.cantidad;  
      })
      let user=req.app.locals.loggedUser.usuario;
      let user_id = req.user._id
      

      res.render('metas/list',{metas,user_id,user})
    }).catch(e=>{
      console.log(e)
    })
})

router.get('/list-for-chart', (req, res) => {
  req.app.locals.loggedUser = req.user;
  Meta.find({usuario:req.app.locals.loggedUser})//.populate('user')
  .then(metas => {
    return res.json(metas)
  }).catch(e=>console.log(e))
})

//R-detalle de metas
router.get('/detail/:id',(req,res,next)=>{
  const {id} =req.params
  Meta.findById(id)
  .then(meta=>{
    res.render('metas/detail',meta)
  })
  .catch(e=>{
    console.log(e)
    next(e)
  })
});

router.post('/detailmas/:id', (req, res, next) => {
  const {id} = req.params
  Meta.findById(id)
  .then(meta => {
    let total = meta.cantidad
    let suma = parseFloat(req.body.cantidad)
    total += suma
    console.log(typeof total)
    Meta.findByIdAndUpdate(id, {cantidad: total}, {new: true})
    .then(result => {
      res.redirect(`/metas/detail/${result._id}`)
  })
  })
})
router.post('/detailmenos/:id', (req, res, next) => {
  const {id} = req.params
  Meta.findById(id)
  .then(meta => {
    let total = meta.cantidad
    let suma = parseFloat(req.body.cantidad)
    total -= suma
    console.log(typeof total)
    Meta.findByIdAndUpdate(id, {cantidad: total}, {new: true})
    .then(result => {
      res.redirect(`/metas/detail/${result._id}`)
  })
  })
})

//C-agregar un meta
// router.get('/new',(req,res,next)=>{
//   res.render('metas/new')
// })
router.post('/new',isLogged,(req, res, next)=>{
  
  //CALCULAR EL PORCENTAJE

    //let req.body
    let cantIni=parseFloat(req.body.cantidadInicial) //10
    let cantObj=parseFloat(req.body.cantidadObjetivo) //
    let porcent=(cantIni*100)/cantObj
    
 
  console.log(typeof(cantObj))

  Meta.create({...req.body,cantidadActual:req.body.cantidadInicial,porcentaje:porcent,usuario:req.user._id})
  //Meta.create({...req.body,owner:req.user._id})
    .then(metas=>{
      res.redirect('/metas/list')
    }).catch(e=>{
      console.log(e)
    })
})

//U-editar un meta
router.get('/edit/:id',(req,res,next)=>{
  const {id} =req.params
  req.app.locals.loggedUser = req.user;
  Meta.findById(id)
  .then(meta=>{
    user=req.app.locals.loggedUser.usuario;
    res.render('metas/edit',{meta,user})
  }).catch(e=>next(e))
})

router.post('/edit/:id',(req, res, next)=>{
  const {id} = req.params
  Meta.findByIdAndUpdate(id,{$set:req.body},{new:true})
    .then(metas=>{
      res.redirect(`/metas/detail/${id}`)
    }).catch(e=>{
      console.log(e)
    })
})

router.post('/edit/:id',(req, res, next)=>{
  const {id} = req.params
  if(req.body.tipoMeta) req.body.tipo=req.body.tipoMeta
  Meta.findByIdAndUpdate(id,{$set:req.body},{new:true})
  //Meta.create({...req.body,owner:req.user._id})
    .then(metas=>{
      res.redirect(`/metas/detail/${id}`)
    }).catch(e=>{
      console.log(e)
    })
})

//D-borrar un meta
router.get('/delete/:id',(req,res,next)=>{
  const {id}=req.params
  Meta.findByIdAndRemove(id)
  .then(metas=>{
    res.redirect('/metas/list')
  }).catch(e=>next(e))
})

module.exports = router