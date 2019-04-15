const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = Schema({
  date: {
    type: Date,
    default: Date.now
  },
  entity: {
    type: Schema.Types.ObjectId,
    refPath: 'entityType'
  },
  entityType: {
    type: String,
  },
  activity: {
      type: String
  },
  user: {
      type: String
  },
  points: {
    type: Number,
    default: 0
  }
});

//UserSchema.set('toJSON', { getters: true, virtuals: true });

module.exports = mongoose.model('Activity', ActivitySchema);
