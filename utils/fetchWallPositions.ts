const fetchWallPositions = async (): Promise<any> => {
    const response = await fetch('./data/wall.json');
    const data = await response.json();
    return data;
}

fetchWallPositions().then((data) => {
    const wallPositions = data;
    console.log(wallPositions);
}).catch((error) => {
    console.log('Fetching error: ', error);
});