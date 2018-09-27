const mongoose = require('mongoose')
const Schema = mongoose.Schema

const metaSchema = new Schema({ 
  nombre: String,
  cantidadObjetivo: {
    type:Number,
    default:0
  },
  cantidadInicial:{
    type:Number,
    default:0
  },
  cantidadActual: {
    type:Number,
    default:0
  },
  porcentaje:{
    type:Number,
    default:0
  },
  fechaFin: String,
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

module.exports = mongoose.model('Meta', metaSchema)