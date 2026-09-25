import express from 'express'

import { home } from '../controllers/homeController.js'
import { organizationList, organizationDetails } from '../controllers/organizationController.js'
import { projectList, projectDetails } from '../controllers/projectController.js'
import { categoryList, categoryDetails } from '../controllers/categoryController.js'

const router = express.Router();

router.get('/', home);

router.get('/organizations', organizationList);
router.get('/organizations/:id', organizationDetails);

router.get('/projects', projectList);
router.get('/projects/:id', projectDetails);

router.get('/categories', categoryList);
router.get('/categories/:id', categoryDetails);

router.get('/test-error', (req, res, next) => {
    next(new Error('This is a test error to verify 500 handling.'));
});

export default router