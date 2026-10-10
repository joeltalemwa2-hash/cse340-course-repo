import { addVolunteer, removeVolunteer } from '../models/volunteers.js'
import { getProjectDetails } from '../models/projects.js'

// Only two return destinations are allowed, so a tampered form value
// can never redirect the user to some other address.
const getReturnPath = (returnTo, projectId) => {
    return returnTo === 'dashboard' ? '/dashboard' : `/project/${projectId}`;
}

const processVolunteerForm = async(req, res, next) => {
    try {
        const { projectId } = req.params;

        if (!/^\d+$/.test(projectId)) {
            return next();
        }

        const projectDetails = await getProjectDetails(projectId);

        if (!projectDetails) {
            return next();
        }

        await addVolunteer(req.session.user.user_id, projectId);

        req.flash('success', `You are now volunteering for ${projectDetails.title}.`);
        res.redirect(getReturnPath(req.body.returnTo, projectId));
    } catch (error) {
        next(error);
    }
}

const processRemoveVolunteerForm = async(req, res, next) => {
    try {
        const { projectId } = req.params;

        if (!/^\d+$/.test(projectId)) {
            return next();
        }

        const projectDetails = await getProjectDetails(projectId);

        if (!projectDetails) {
            return next();
        }

        await removeVolunteer(req.session.user.user_id, projectId);

        req.flash('success', `You are no longer volunteering for ${projectDetails.title}.`);
        res.redirect(getReturnPath(req.body.returnTo, projectId));
    } catch (error) {
        next(error);
    }
}

export {processVolunteerForm, processRemoveVolunteerForm}