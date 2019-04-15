let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ComplaintSchema = Schema({
  name: { type: String, required: true },
  by: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'User'
  },
  details: {
      type: String,
      required: true
  },
  resolved: {
      type: Boolean, 
      default: false
  }
});
const Complaint = mongoose.model('Complaint', ComplaintSchema);
module.exports = Complaint;
