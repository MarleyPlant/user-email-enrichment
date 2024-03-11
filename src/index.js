import emailToName from 'email-to-name';
import { getCompanyFromEmail, getGitHubInfo, getGitlab, getGravatar } from './providers/index.js';
import { transform } from './transform.js';

const enrich = async email => {
    if (!email) {
        throw 'error';
    } else {
        const nameFromEmail = emailToName.process(email);
        const companyFromEmail = getCompanyFromEmail(email);
        const ghProfile = await getGitHubInfo(email);
        const glProfile = await getGitlab(email);
        const gravatar = await getGravatar(email);
        return transform(ghProfile, glProfile, gravatar, nameFromEmail, companyFromEmail);
    }
};

export default enrich;
