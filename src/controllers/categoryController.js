import { getAllCategories, getCategoryById } from '../models/categories.js'
import { getProjectsForCategory } from '../models/projects.js'

const categoryList = async(req, res, next) => {
    try {
        const categories = await getAllCategories();
        const title = 'Categories';

        res.render('categories', { title, categories });
    } catch (error) {
        next(error);
    }
}

const categoryDetails = async(req, res, next) => {
    try {
        const { id } = req.params;

        if (!/^\d+$/.test(id)) {
            return next();
        }

        const category = await getCategoryById(id);

        if (!category) {
            return next();
        }

        const projects = await getProjectsForCategory(id);
        const title = category.name;

        res.render('category-details', { title, category, projects });
    } catch (error) {
        next(error);
    }
}

export {categoryList, categoryDetails}