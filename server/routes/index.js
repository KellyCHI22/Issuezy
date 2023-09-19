const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const projectController = require('../controllers/project-controller');
const categoryController = require('../controllers/category-controller');
const issueController = require('../controllers/issue-controller');
const commentController = require('../controllers/comment-controller');
const { apiErrorHandler } = require('../middlewares/error-handler');
const { authenticated } = require('../middlewares/auth');

// * auth related
router.post('/users/signup', userController.signUp);
router.post('/users/signin', userController.signIn);
router.post('/users/permission', userController.checkPermission);
router.get('/users/current', authenticated, userController.getCurrentUser);

// * projects
router.delete(
  '/projects/:id/members',
  authenticated,
  projectController.removeMember
);
router.post(
  '/projects/:id/members',
  authenticated,
  projectController.addMember
);

// * categories
router.patch(
  '/projects/:id/categories/:cid',
  authenticated,
  categoryController.patchCategory
);
router.delete(
  '/projects/:id/categories/:cid',
  authenticated,
  categoryController.deleteCategory
);
router.get(
  '/projects/:id/categories',
  authenticated,
  categoryController.getCategories
);
router.post(
  '/projects/:id/categories',
  authenticated,
  categoryController.postCategory
);

// * comments
router.patch(
  '/projects/:id/issues/:iid/comments/:cid',
  authenticated,
  commentController.patchComment
);
router.delete(
  '/projects/:id/issues/:iid/comments/:cid',
  authenticated,
  commentController.deleteComment
);
router.post(
  '/projects/:id/issues/:iid/comments',
  authenticated,
  commentController.postComment
);
router.get(
  '/projects/:id/issues/:iid/comments',
  authenticated,
  commentController.getComments
);

// * issues
router.patch(
  '/projects/:id/issues/:iid/assign',
  authenticated,
  issueController.assignIssue
);
router.get(
  '/projects/:id/issues/:iid',
  authenticated,
  issueController.getIssue
);
router.patch(
  '/projects/:id/issues/:iid',
  authenticated,
  issueController.patchIssue
);
router.delete(
  '/projects/:id/issues/:iid',
  authenticated,
  issueController.deleteIssue
);
router.get('/projects/:id/issues', authenticated, issueController.getIssues);
router.post('/projects/:id/issues', authenticated, issueController.postIssue);

router.get('/projects/:id', authenticated, projectController.getProject);
router.patch('/projects/:id', authenticated, projectController.patchProject);
router.delete('/projects/:id', authenticated, projectController.deleteProject);
router.get('/projects', authenticated, projectController.getProjects);
router.post('/projects', authenticated, projectController.postProject);

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.use('/', apiErrorHandler);

module.exports = router;
