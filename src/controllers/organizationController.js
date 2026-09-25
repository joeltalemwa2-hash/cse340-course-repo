import { getAllOrganizations, getOrganizationById } from '../models/organizations.js'
import { getProjectsByOrganizationId } from '../models/projects.js'

const organizationList = async(req, res, next) => {
    try {
        const organizations = await getAllOrganizations();
        const title = 'Our Partner Organizations';

        res.render('organizations', { title, organizations });
    } catch (error) {
        next(error);
    }
}

const organizationDetails = async(req, res, next) => {
    try {
        const { id } = req.params;

        if (!/^\d+$/.test(id)) {
            return next();
        }

        const organization = await getOrganizationById(id);

        if (!organization) {
            return next();
        }

        const projects = await getProjectsByOrganizationId(id);
        const title = organization.name;

        res.render('organization-details', { title, organization, projects });
    } catch (error) {
        next(error);
    }
}

export {organizationList, organizationDetails}