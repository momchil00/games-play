const baseUrl = "http://localhost:3030";

export const getAll = () => {
    return fetch(`${baseUrl}/data/games`)
    .then(res => res.json())


};
//?sortBy=_createdOn%20desc&distinct=category