export const pickBestName = (ghProfile, glProfile, gravProfile, inferredName) => {
    const gravatarName = gravProfile?.[0]?.name?.formatted;
    const gravatarDisplayName = gravProfile?.[0]?.displayName;
    const githubName = ghProfile?.name;
    return gravatarName || githubName || gravatarDisplayName || inferredName;
};