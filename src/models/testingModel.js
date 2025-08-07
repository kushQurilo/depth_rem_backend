const mongoose = require('mongoose');

const emiSchema = new mongoose.Schema({
  phone: {
    type: Number,
    ref: 'user',
    required: true
  },
  totalEmis: {
    type: Number,
    required: true
  },
  emiAmount: {
    type: Number,
    required: true
  },
  emis: [
    {
      dueDate: { type: Date, required: true },
      isPaid: { type: Boolean, default: false },
      paidDate: { type: Date }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('EMI', emiSchema);
