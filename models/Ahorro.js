const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ahorroSchema = new Schema({ 
  nombre: String,
  cantidadInicial: Number,
  cantidad: {
    type:Number,
    default:'0'
  },
  porcentaje: Number,
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "User"
  } 
},{
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Ahorro', ahorroSchema)