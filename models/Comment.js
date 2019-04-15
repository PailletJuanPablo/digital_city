let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = Schema({
  text: {type: String, required: true},
  by: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'byModel'
  },
  byModel: {
    type: String,
    required: true,
    enum: ['Company', 'Person']
  },
  feel: {
    type: String,
    enum: ['Positive', 'Medium', 'Negative'],
  },
  for: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'forModel'
  },
  forModel: {
    type: String,
    required: true,
    enum: ['Company', 'Person']
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
