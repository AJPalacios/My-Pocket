const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const diarioSchema = new Schema({
  concepto:{
    type:String
  },
  cantidad: {
    type:Number,
    default:0
  },
  fecha:String,
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

const Diario = mongoose.model('Diario', diarioSchema);
module.exports = Diario;