const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const projectController = require('../controllers/project-controller');
const categoryController = require('../controllers/category-controller');
const issueController = require('../controllers/issue-controller');
const { apiErrorHandler } = require('../middlewares/error-handler');
const { authenticated } = require('../middlewares/auth');

// * signup and signin
router.post('/users/signup', userController.signUp);
router.post('/users/signin', userController.signIn);

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

// * issues
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
