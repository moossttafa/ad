const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: String,
  slug: String,
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'CategorySchema',
  },
  children: [{
    type: Schema.Types.ObjectId,
    ref: 'CategorySchema',
  }],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Category', CategorySchema)
