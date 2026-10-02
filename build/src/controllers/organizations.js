import { body, validationResult } from 'express-validator';

import { getAllOrganizations, getOrganizationDetails, createOrganization, updateOrganization } from '../models/organizations.js'
import { getProjectsByOrganizationId } from '../models/projects.js'

// Validation and sanitization rules for the organization create/edit forms
const organizationValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Organization name must be between 3 and 150 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Organization description is required')
        .isLength({ max: 500 })
        .withMessage('Organization description cannot exceed 500 characters'),
    body('contactEmail')
        .normalizeEmail()
        .notEmpty()
        .withMessage('Contact email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
];

const showOrganizationsPage = async(req, res, next) => {
    try {
        const organizations = await getAllOrganizations();
        const title = 'Our Partner Organizations';

        res.render('organizations', { title, organizations });
    } catch (error) {
        next(error);
    }
}

const showOrganizationDetailsPage = async(req, res, next) => {
    try {
        const { id } = req.params;

        if (!/^\d+$/.test(id)) {
            return next();
        }

        const organizationDetails = await getOrganizationDetails(id);

        if (!organizationDetails) {
            return next();
        }

        const projects = await getProjectsByOrganizationId(id);
        const title = organizationDetails.name;

        res.render('organization', { title, organizationDetails, projects });
    } catch (error) {
        next(error);
    }
}

const showNewOrganizationForm = async(req, res) => {
    const title = 'Add New Organization';

    res.render('new-organization', { title });
}

const processNewOrganizationForm = async(req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-organization');
    }

    const { name, description, contactEmail } = req.body;
    const logoFilename = 'placeholder-logo.png'; // Use the placeholder logo for all new organizations

    const organizationId = await createOrganization(name, description, contactEmail, logoFilename);

    req.flash('success', 'Organization added successfully!');
    res.redirect(`/organization/${organizationId}`);
}

const showEditOrganizationForm = async(req, res, next) => {
    try {
        const { id } = req.params;

        if (!/^\d+$/.test(id)) {
            return next();
        }

        const organizationDetails = await getOrganizationDetails(id);

        if (!organizationDetails) {
            return next();
        }

        const title = 'Edit Organization';
        res.render('edit-organization', { title, organizationDetails });
    } catch (error) {
        next(error);
    }
}

const processEditOrganizationForm = async(req, res) => {
    const organizationId = req.params.id;

    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/edit-organization/' + organizationId);
    }

    const { name, description, contactEmail, logoFilename } = req.body;

    await updateOrganization(organizationId, name, description, contactEmail, logoFilename);

    req.flash('success', 'Organization updated successfully!');
    res.redirect(`/organization/${organizationId}`);
}

export {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm,
    organizationValidation
};
