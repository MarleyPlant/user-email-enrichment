export async function getGitlab(email) {
    let token = ``;
    let gitlabENDPOINT = `https://gitlab.com/api/v4/users?search=${email}`;
    return await fetch(gitlabENDPOINT, {
        method: "GET",
        headers: {
        "PRIVATE-TOKEN": token,
        },
    }).then(async (response) => {
        return await response.json().then((data) => {
        if (data.length > 0) {
            return {
                "profile_url": data[0].web_url,
                "avatar_url": data[0].avatar_url,
                "username": data[0].username,
                "name": data[0].name
              };
        }
        });
    });
}