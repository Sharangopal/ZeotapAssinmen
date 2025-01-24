const mongoose = require('mongoose');

const CellSchema = new mongoose.Schema({
  row: { type: Number, required: true },
  col: { type: Number, required: true },
  value: { type: String, default: '' },
  formula: { type: String },
  style: { type: mongoose.Schema.Types.Mixed }
});

const SheetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cells: [CellSchema],
  userId: { type: String, required: true }
});

module.exports = mongoose.model('Sheet', SheetSchema);