import fetch from "node-fetch";

export async function getGitlab(email) {
    let token = `glpat-BVtwQyhdrvqbMCpPEDaE`;
    let gitlabENDPOINT = `https://gitlab.com/api/v4/users?search=${email}`;

    let response = await fetch(gitlabENDPOINT, {
        method: 'GET',
        headers: {
            'PRIVATE-TOKEN': token
        }
    });
    let data = await response.json();
    if (data.length > 0) {
        return {
            "profile_url": data[0].web_url,
            "avatar_url": data[0].avatar_url,
            "username": data[0].username,
            "name": data[0].name
          };
    } else {
        return null;
    }
}