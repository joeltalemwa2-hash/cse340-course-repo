import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.date,
            sp.organization_id,
            o.name AS organization_name
        FROM public.service_project sp
        JOIN public.organization o ON sp.organization_id = o.organization_id
        ORDER BY sp.date;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectDetails = async(id) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.date,
            sp.organization_id,
            o.name AS organization_name
        FROM public.service_project sp
        JOIN public.organization o ON sp.organization_id = o.organization_id
        WHERE sp.project_id = $1;
    `;

    const result = await db.query(query, [id]);

    return result.rows[0];
}

const getProjectsByOrganizationId = async(id) => {
    const query = `
        SELECT project_id, title, date
        FROM public.service_project
        WHERE organization_id = $1
        ORDER BY date;
    `;

    const result = await db.query(query, [id]);

    return result.rows;
}

const getProjectsByCategoryId = async(id) => {
    const query = `
        SELECT sp.project_id, sp.title, sp.date
        FROM public.service_project sp
        JOIN public.project_category pc ON sp.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY sp.date;
    `;

    const result = await db.query(query, [id]);

    return result.rows;
}

/**
 * Creates a new service project in the database.
 * Note: this project's table is named service_project (not project) in this
 * application's schema -- everything else follows the course's exact pattern.
 */
const createProject = async(title, description, location, date, organizationId) => {
    const query = `
        INSERT INTO service_project (title, description, location, date, organization_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}

const updateProject = async(projectId, title, description, location, date, organizationId) => {
    const query = `
        UPDATE service_project
        SET title = $1, description = $2, location = $3, date = $4, organization_id = $5
        WHERE project_id = $6
        RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId, projectId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Project not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated project with ID:', projectId);
    }

    return result.rows[0].project_id;
}

export {getAllProjects, getProjectDetails, getProjectsByOrganizationId, getProjectsByCategoryId, createProject, updateProject}
