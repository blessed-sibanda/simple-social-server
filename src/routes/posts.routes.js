const { Router } = require('express');
const { requireAuth } = require('../middlewares/auth.middleware');
const postsCtrl = require('../controllers/posts.controller');
const { isPostOwner, isCommentOwner } = require('../middlewares/posts.middleware');

const router = Router();

router.post('/', requireAuth, postsCtrl.createPost);

router.get('/feed', requireAuth, postsCtrl.postFeed);

router.get('/user/:userId', requireAuth, postsCtrl.userPosts);

router.delete('/:postId', requireAuth, isPostOwner, postsCtrl.deletePost);

router.put('/:postId/like', requireAuth, postsCtrl.likePost);

router.delete('/:postId/like', requireAuth, postsCtrl.unlikePost);

router.post('/:postId/comments', requireAuth, postsCtrl.createComment);

router.delete(
  '/:postId/comments/:commentId',
  requireAuth,
  isCommentOwner,
  postsCtrl.deleteComment,
);

module.exports = router;
