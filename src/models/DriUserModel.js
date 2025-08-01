const mongoose = require('mongoose');
const Counter  = require('./counter')
const userSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    tyep:String
  },
  gender: {
    type: String,
    default: 'Other',
  },
  phone:{
    type:String
  },
  dateOfJoin: {
    type: Date,
    default:Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'userId' }, 
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.id = `#${String(counter.seq).padStart(5, '0')}`;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const DrisModel = mongoose.model('DriUser', userSchema);
module.exports = DrisModel;
