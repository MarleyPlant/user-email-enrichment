import { pickBestName } from './pickBestName.js';
import { pickTwitterUsername } from './providers/twitter.js';

const dropFalsey = obj => {
    return Object.keys(obj).reduce((acc, key) => {
        if (obj[key]) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
};

export const transform = (ghProfile, glProfile, gravProfile, inferredName, companyFromEmail) => {
    const twitterUsername = pickTwitterUsername(ghProfile, gravProfile);

    const bestGuess = {
        name: pickBestName(ghProfile, glProfile, gravProfile, inferredName),
        displayName: gravProfile?.[0].displayName,
        company: ghProfile?.company || companyFromEmail,
        avatarUrl: ghProfile?.avatar_url || gravProfile?.[0].photos?.[0].value,
        location: gravProfile?.[0].currentLocation || ghProfile?.location,
        twitterUsername: twitterUsername,
        twitterUrl: twitterUsername ? `https://twitter.com/${twitterUsername}` : null,
        githubUrl: ghProfile?.profile_url,
        githubUsername: ghProfile?.username,
        bio: gravProfile?.[0].aboutMe || ghProfile?.bio,
        website: ghProfile?.website
    };
    return {
        guess: dropFalsey(bestGuess),
        profiles: {
            github: ghProfile,
            gitlab: glProfile,
            gravatar: gravProfile
        }
    };
};
