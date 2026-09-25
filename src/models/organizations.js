import db from './db.js'

const getOrganizationById = async(id) => {
    const query = `
        SELECT organization_id, name, description, contact_email, logo_filename
        FROM public.organization
        WHERE organization_id = $1;
    `;

    const result = await db.query(query, [id]);

    return result.rows[0];
}

export {getAllOrganizations, getOrganizationById}