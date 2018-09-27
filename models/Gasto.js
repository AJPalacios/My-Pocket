const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const gastoSchema = new Schema({
  tipo:{
    type:String
  },
  cantidad: {
    type:Number,
    default:0
  },
  periodicidad:{
    type:String,
    enum:["Diario","Semanal","Quincenal","Mensual"],
    default:"Mensual"
  },
  usuario:{
    type:Schema.Types.ObjectId,
    ref:'User'
  }
}, {
  timestamps: {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
  }
});

const Gasto = mongoose.model('Gasto', gastoSchema);
module.exports = Gasto;