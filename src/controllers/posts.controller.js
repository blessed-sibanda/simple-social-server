const formidable = require('formidable');

const { uploadSingleFile } = require('../middlewares/upload.middleware');
const { removeFile } = require('../helpers/upload.helper');
const User = require('../models/user.model');
const Post = require('../models/post.model');
const { formatError } = require('../helpers/error.helper');

module.exports.postFeed = async (req, res) => {
  try {
    let user = await User.findById(req.auth.id).populate('following', '_id');
    let following = user.following;
    following.push(user._id);
    let posts = await Post.find({ postedBy: { $in: following } })
      .populate('comments', '_id text commentedBy')
      .populate('comments.commentedBy', '_id name photo photoUrl')
      .populate('postedBy', '_id name photo photoUrl')
      .populate('likes', '_id')
      .sort('-createdAt');
    res.json(posts);
  } catch (err) {
    return res.status(500).json(formatError(err));
  }
};

module.exports.userPosts = async (req, res) => {
  try {
    let posts = await Post.find({ postedBy: req.params.userId })
      .populate('comments', '_id text commentedBy')
      .populate('comments.commentedBy', '_id name photo photoUrl')
      .populate('postedBy', '_id name photo photoUrl')
      .populate('likes', '_id')
      .sort('-createdAt');
    res.json(posts);
  } catch (err) {
    return res.status(500).json(formatError(err));
  }
};

module.exports.createPost = async (req, res) => {
  try {
    let post;
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      post = new Post(fields);
      post.postedBy = req.auth.id;
    });

    await uploadSingleFile(req, res);

    if (req.file) {
      post.photo = req.file.filename;
    }

    await post.save();
    post = await Post.findById(post._id).populate(
      'postedBy',
      '_id name photo photoUrl',
    );
    return res.json(post);
  } catch (err) {
    console.log('error -->', err);
    return res.status(400).json(formatError(err));
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId);
    if (post.photo) await removeFile(post.photo);
    await post.remove();
    res.status(204).json();
  } catch (err) {
    res.status(400).json(formatError(err));
  }
};

module.exports.likePost = async (req, res, next) => {
  try {
    let post = await Post.findByIdAndUpdate(
      req.params.postId,
      { $addToSet: { likes: req.auth.id } },
      { new: true },
    ).populate('likes', '_id');
    res.json(post);
  } catch (err) {
    next(err);
  }
};

module.exports.unlikePost = async (req, res, next) => {
  try {
    let post = await Post.findByIdAndUpdate(
      req.params.postId,
      { $pull: { likes: req.auth.id } },
      { new: true },
    ).populate('likes', '_id');
    res.json(post);
  } catch (err) {
    next(err);
  }
};

module.exports.createComment = async (req, res, next) => {
  try {
    let post = await Post.findByIdAndUpdate(
      req.params.postId,
      { $addToSet: { comments: { commentedBy: req.auth.id, text: req.body.text } } },
      { new: true },
    )
      .populate('comments', '_id text commentedBy')
      .populate('postedBy', '_id name photo photoUrl')
      .populate('comments.commentedBy', '_id name photo photoUrl');
    res.json(post);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteComment = async (req, res, next) => {
  try {
    let post = await Post.findByIdAndUpdate(
      req.params.postId,
      { $pull: { comments: { _id: req.params.commentId } } },
      { new: true },
    )
      .populate('comments', '_id text commentedBy')
      .populate('comments.commentedBy', '_id name photo photoUrl');
    res.json(post);
  } catch (err) {
    next(err);
  }
};
