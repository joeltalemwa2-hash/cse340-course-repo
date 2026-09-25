import { getAllProjects, getProjectById } from '../models/projects.js'
import { getCategoriesForProject } from '../models/categories.js'

const projectList = async(req, res, next) => {
    try {
        const projects = await getAllProjects();
        const title = 'Service Projects';

        res.render('projects', { title, projects });
    } catch (error) {
        next(error);
    }
}

const projectDetails = async(req, res, next) => {
    try {
        const { id } = req.params;

        if (!/^\d+$/.test(id)) {
            return next();
        }

        const project = await getProjectById(id);

        if (!project) {
            return next();
        }

        const categories = await getCategoriesForProject(id);
        const title = project.title;

        res.render('project-details', { title, project, categories });
    } catch (error) {
        next(error);
    }
}

export {projectList, projectDetails}