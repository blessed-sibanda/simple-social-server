const Post = require('../models/post.model');

const isPostOwner = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.postId);
    const authorized = post && post.postedBy._id.toString() === req.auth.id;
    if (!authorized)
      return res.status(403).json({
        message: 'Only the post owner is authorized to perform this action',
      });
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { isPostOwner };
