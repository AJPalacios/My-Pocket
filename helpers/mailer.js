const nodemailer = require('nodemailer')
const hbs = require('hbs')
const fs = require ('fs')

const transporter = nodemailer.createTransport({
  service:'Gmail',
  auth:{
    user:process.env.EMAIL,
    pass:process.env.EMAILPASS
  }
})

const welcomeTemplate = hbs.compile(fs.readFileSync((__dirname, './views/welcomeMail.hbs'), 'utf8'))

exports.welcomeMail=(username, email)=>{
  
  transporter.sendMail({
    from:'el app bien chila',
    to:email,
    subject:'Welcome to myPocket',
    html: welcomeTemplate({username})
  }).then(info=>{
    console.log(info)
  }).catch(error=>{
    console.log(error)
    throw error
  })

}