const { Router } = require('express');
const { requireAuth } = require('../middlewares/auth.middleware');
const postsCtrl = require('../controllers/posts.controller');
const { isPostOwner } = require('../middlewares/posts.middleware');

const router = Router();

router.post('/', requireAuth, postsCtrl.createPost);

router.get('/', requireAuth, postsCtrl.postFeed);

router.delete('/:postId', requireAuth, isPostOwner, postsCtrl.deletePost);

router.put('/:postId/like', requireAuth, postsCtrl.likePost);

router.delete('/:postId/like', requireAuth, postsCtrl.unlikePost);

module.exports = router;
