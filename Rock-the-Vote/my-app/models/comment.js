const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  comment: {
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
  },
  issueId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
})

module.exports = mongoose.model("Comment", commentSchema)