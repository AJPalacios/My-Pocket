const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PLM = require('passport-local-mongoose')

const userSchema = new Schema({ 
  nombre: String,
  apellido:String,
  email:String,
  photoURL: String,
  codeConfirmation: String,
  Status:{
    enum: ['Active', 'Pending']
  }
},{
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('User', userSchema.plugin(PLM,{usernameField:'email'}))