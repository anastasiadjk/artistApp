const axios = require('axios');
const fs = require('fs');
const csv = require('fast-csv');
const prompt = require('prompt-sync')();


//getting the user input
const fileName = prompt("Write the name of your CSV file: ");
let name = prompt("Write the artist name: ");


//Insert YOUR PRIVATE KEY HERE
const myKey = "";


writeToCsv = (file, artist) => {

    let ws = fs.createWriteStream(`${file}.csv`);

    csv
        .write([
            ['name', artist.name],
            ['mbid', artist.mbid],
            ['url', artist.url],
            ['image_small', artist.image[0]['#text']],
            ['image', artist.image[1]['#text']],
        ], { headers: true }).pipe(ws);
}


getRandomArtist = () => {
    const artists = ['John Lenon', 'Ed Sheeran', 'Lewis Capaldi', 'Rihanna', 'Billie Eilish'];
    const randomNumber = Math.floor(Math.random() * 4);
    return artists[randomNumber]
}

getArtistFromMyList = async () => {
    name = getRandomArtist();

    try {
        const { data } = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${name}&api_key=${myKey}&format=json`);
        const artist = data.results.artistmatches.artist[0];

        writeToCsv(fileName, artist);
    }

    catch (err) {
        console.log(err.message);
    }

};

getArtistInfo = async () => {
    try {
        const { data } = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${name}&api_key=2e9313bb3d8cbe73420e5221e1f631c3&format=json`);
        const artist = data.results.artistmatches.artist[0];

        writeToCsv(fileName, artist);
    }

    catch (err) {
        getArtistFromMyList();
    }

};

getArtistInfo();



