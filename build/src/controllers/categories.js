import { body, validationResult } from 'express-validator';

import { getAllCategories, getCategoryDetails, getCategoriesByServiceProjectId, createCategory, updateCategory, updateCategoryAssignments } from '../models/categories.js'
import { getProjectsByCategoryId, getProjectDetails } from '../models/projects.js'

// Validation and sanitization rules for the category create/edit forms.
// Per the assignment: server-side enforces both a max (100) and a min (3)
// length, but the client-side form only enforces the max length -- the
// minimum is intentionally left server-side-only so it can be tested.
const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters')
];

const showCategoriesPage = async(req, res, next) => {
    try {
        const categories = await getAllCategories();
        const title = 'Categories';

        res.render('categories', { title, categories });
    } catch (error) {
        next(error);
    }
}

const showCategoryDetailsPage = async(req, res, next) => {
    try {
        const { id } = req.params;

        if (!/^\d+$/.test(id)) {
            return next();
        }

        const categoryDetails = await getCategoryDetails(id);

        if (!categoryDetails) {
            return next();
        }

        const projects = await getProjectsByCategoryId(id);
        const title = categoryDetails.name;

        res.render('category', { title, categoryDetails, projects });
    } catch (error) {
        next(error);
    }
}

const showNewCategoryForm = async(req, res) => {
    const title = 'Add New Category';

    res.render('new-category', { title });
}

const processNewCategoryForm = async(req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-category');
    }

    const { name } = req.body;

    const categoryId = await createCategory(name);

    req.flash('success', 'Category added successfully!');
    res.redirect(`/category/${categoryId}`);
}

const showEditCategoryForm = async(req, res, next) => {
    try {
        const { id } = req.params;

        if (!/^\d+$/.test(id)) {
            return next();
        }

        const categoryDetails = await getCategoryDetails(id);

        if (!categoryDetails) {
            return next();
        }

        const title = 'Edit Category';
        res.render('edit-category', { title, categoryDetails });
    } catch (error) {
        next(error);
    }
}

const processEditCategoryForm = async(req, res) => {
    const categoryId = req.params.id;

    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/edit-category/' + categoryId);
    }

    const { name } = req.body;

    await updateCategory(categoryId, name);

    req.flash('success', 'Category updated successfully!');
    res.redirect(`/category/${categoryId}`);
}

const showAssignCategoriesForm = async(req, res, next) => {
    try {
        const { projectId } = req.params;

        if (!/^\d+$/.test(projectId)) {
            return next();
        }

        const projectDetails = await getProjectDetails(projectId);

        if (!projectDetails) {
            return next();
        }

        const categories = await getAllCategories();
        const assignedCategories = await getCategoriesByServiceProjectId(projectId);

        const title = 'Assign Categories to Project';

        res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
    } catch (error) {
        next(error);
    }
}

const processAssignCategoriesForm = async(req, res) => {
    const { projectId } = req.params;
    const selectedCategoryIds = req.body.categoryIds || [];

    // Ensure selectedCategoryIds is always an array, even if only one box was checked
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];

    await updateCategoryAssignments(projectId, categoryIdsArray);

    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
}

export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    categoryValidation
};
