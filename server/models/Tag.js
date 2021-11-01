const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new Schema({
  name: String,
  slug: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Tag', TagSchema)
