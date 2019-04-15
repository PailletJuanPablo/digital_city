let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CategorySchema = Schema({
  name: {type: String, required: true},
  parent: { type: Schema.Types.ObjectId, ref: 'Category' },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
