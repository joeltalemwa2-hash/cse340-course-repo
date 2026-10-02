import { body, validationResult } from 'express-validator';

import { getAllProjects, getProjectDetails, createProject, updateProject } from '../models/projects.js'
import { getAllOrganizations } from '../models/organizations.js'
import { getCategoriesByServiceProjectId } from '../models/categories.js'

// Validation and sanitization rules for the project create/edit forms
const projectValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required')
        .isLength({ max: 200 }).withMessage('Location must be less than 200 characters'),
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Date must be a valid date format'),
    body('organizationId')
        .notEmpty().withMessage('Organization is required')
        .isInt().withMessage('Organization must be a valid integer')
];

const showProjectsPage = async(req, res, next) => {
    try {
        const projects = await getAllProjects();
        const title = 'Service Projects';

        res.render('projects', { title, projects });
    } catch (error) {
        next(error);
    }
}

const showProjectDetailsPage = async(req, res, next) => {
    try {
        const { id } = req.params;

        if (!/^\d+$/.test(id)) {
            return next();
        }

        const projectDetails = await getProjectDetails(id);

        if (!projectDetails) {
            return next();
        }

        const categories = await getCategoriesByServiceProjectId(id);
        const title = projectDetails.title;

        res.render('project', { title, projectDetails, categories });
    } catch (error) {
        next(error);
    }
}

const showNewProjectForm = async(req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Add New Service Project';

    res.render('new-project', { title, organizations });
}

const processNewProjectForm = async(req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-project');
    }

    const { title, description, location, date, organizationId } = req.body;

    const newProjectId = await createProject(title, description, location, date, organizationId);

    req.flash('success', 'New service project created successfully!');
    res.redirect(`/project/${newProjectId}`);
}

const showEditProjectForm = async(req, res, next) => {
    try {
        const { id } = req.params;

        if (!/^\d+$/.test(id)) {
            return next();
        }

        const projectDetails = await getProjectDetails(id);

        if (!projectDetails) {
            return next();
        }

        const organizations = await getAllOrganizations();
        const title = 'Edit Service Project';

        res.render('edit-project', { title, projectDetails, organizations });
    } catch (error) {
        next(error);
    }
}

const processEditProjectForm = async(req, res) => {
    const projectId = req.params.id;

    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/edit-project/' + projectId);
    }

    const { title, description, location, date, organizationId } = req.body;

    await updateProject(projectId, title, description, location, date, organizationId);

    req.flash('success', 'Service project updated successfully!');
    res.redirect(`/project/${projectId}`);
}

export {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation
};
