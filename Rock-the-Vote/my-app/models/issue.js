const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
  topic: {
    type: String,
    required: true,
  },
  postDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    lowercase: true
  }
})

module.exports = mongoose.model("Issue", issueSchema)