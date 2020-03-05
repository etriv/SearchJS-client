const serverUrl = process.env.REACT_APP_SERVER_URL;

console.log(process.env);

async function getTweets(searchTerm) {
    if (searchTerm === undefined) {
        throw new Error('Search term is empty');
    }
    
    let fetchUrl = serverUrl + '/tweets/';
    fetchUrl += '?search=' + searchTerm;

    console.log('Fetching:', fetchUrl);
    return fetch(fetchUrl)
        .then(response => {
            if (response.status === 200)
                return response.json();
            return [];  // In case response is not OK (it's empty)
        })
        .catch((e) => {
            console.log('Error while fetching tweets', e);
            return [];
        });
}

export { getTweets };