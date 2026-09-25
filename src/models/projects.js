import db from './db.js'

const getProjectById = async(id) => {
    const query = `
        SELECT
            sp.project_id, sp.title, sp.description, sp.location, sp.date,
            sp.organization_id, o.name AS organization_name
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

const getProjectsForCategory = async(id) => {
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

export {getAllProjects, getProjectById, getProjectsByOrganizationId, getProjectsForCategory}