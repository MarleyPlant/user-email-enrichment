import emailToName from 'email-to-name';
import { getCompanyFromEmail, getGitHubInfo, getGitlab, getGravatar } from './providers/index.js';
import { transform } from './transform.js';
const enrich = async (email) => {
  if (!email) {
    throw "error";
  } else {
    let results = {};
    let providers = {"name": emailToName.process, "company": getCompanyFromEmail, "github": getGitHubInfo, "gravatar": getGravatar};
    for (let [key, value] of Object.entries(providers)) {
      if (value == undefined) {
        throw "error";
      }

      try {
        results[key] = await value(email);
      } catch (e) {
        console.error(e);
      }

    }
    return results;

    // return transform(ghProfile, gravatar, nameFromEmail, companyFromEmail);
  }
};
export default enrich;
