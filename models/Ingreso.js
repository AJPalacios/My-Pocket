const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ingresoSchema = new Schema({ 
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  concepto: String,
  cantidad: Number,
  periodicidad:{
    type: String,
    enum: ['Diario', 'Semanal', 'Quincenal', 'Mensual', 'Anual'],
    default: 'Mensual'
  }
},{
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Ingreso', ingresoSchema)