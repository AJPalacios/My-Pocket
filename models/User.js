const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PLM = require('passport-local-mongoose')

const userSchema = new Schema({
  usuario:String, 
  nombre: String,
  apellido:String,
  email:String,
  photoURL: {
    type: String,
    default: 'https://res.cloudinary.com/mishulicious/image/upload/v1537995855/myPocket/blue-head.jpg'
  },
  codeConfirmation: String,
  Status:{
    type: String,
    enum: ['Active', 'Pending'],
    default: 'Pending'
  },
  ahorros: {
    type:Schema.Types.ObjectId,
    ref:'Ahorro'
  },
  diarios: {
    type:Schema.Types.ObjectId,
    ref:'Diario'
  },
  gastos: {
    type:Schema.Types.ObjectId,
    ref:'Gastos'
  },
  ingresos: {
    type:Schema.Types.ObjectId,
    ref:'Ingreso'
  }
},{
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('User', userSchema.plugin(PLM,{usernameField:'email'}))