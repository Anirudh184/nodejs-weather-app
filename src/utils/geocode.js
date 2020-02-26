const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURI(address)+".json?access_token=pk.eyJ1IjoiYW5pcnVkaGE5NiIsImEiOiJjazZxcG83b3IwMzdsM2xzNHJxbnc0ZHo2In0.TIlgZnN9IWr1S3GweC4EAw&limit=1";


    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Something went wrong geocode service unavailable.');
        } else if(!response.body.features) {
            callback('Search Term not available. Try again with another seach term.');
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    });
}

module.exports = geocode