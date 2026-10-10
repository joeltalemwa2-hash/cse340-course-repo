import db from './db.js'

const addVolunteer = async(userId, projectId) => {
    // ON CONFLICT DO NOTHING makes signing up twice harmless instead of an error
    const query = `
        INSERT INTO volunteer (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, project_id) DO NOTHING;
    `;

    await db.query(query, [userId, projectId]);

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log(`User ${userId} volunteered for project ${projectId}`);
    }
}

const removeVolunteer = async(userId, projectId) => {
    const query = `
        DELETE FROM volunteer
        WHERE user_id = $1 AND project_id = $2;
    `;

    await db.query(query, [userId, projectId]);

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log(`User ${userId} stopped volunteering for project ${projectId}`);
    }
}

const isUserVolunteering = async(userId, projectId) => {
    const query = `
        SELECT 1
        FROM public.volunteer
        WHERE user_id = $1 AND project_id = $2;
    `;

    const result = await db.query(query, [userId, projectId]);

    return result.rows.length > 0;
}

const getVolunteerProjectsByUserId = async(userId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.date,
            sp.location,
            o.name AS organization_name
        FROM public.volunteer v
        JOIN public.service_project sp ON v.project_id = sp.project_id
        JOIN public.organization o ON sp.organization_id = o.organization_id
        WHERE v.user_id = $1
        ORDER BY sp.date;
    `;

    const result = await db.query(query, [userId]);

    return result.rows;
}

export {addVolunteer, removeVolunteer, isUserVolunteering, getVolunteerProjectsByUserId}