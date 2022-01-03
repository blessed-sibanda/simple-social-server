const mongoose = require('mongoose');
const config = require('../config');

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: 'Text is required',
    },
    photo: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [
      {
        text: {
          required: 'Comment text is required',
          type: String,
        },
        createdAt: { type: Date, default: Date.now },
        commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
  },
  { timestamps: true },
);

postSchema.virtual('photoUrl').get(function () {
  if (this.photo) {
    return config.filesUrl + this.photo;
  } else return '';
});

postSchema.set('toObject', { virtuals: true });
postSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Post', postSchema);
