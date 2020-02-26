const request  = require('request');

const weather = (long, lat, callback) => {
    const url = "https://api.darksky.net/forecast/37a57c7b119ce56012cc992bd96a632b/" + lat + "," + long +"?lang=en";

    request({url : url, json : true}, (error, response) => {
        if(error) {
            callback('Something went wrong. Weather services is currently not available!');
        } else if(response.body.error) {
            callback('Request parameters not proper. Please try again.');
        } else {
            callback(undefined, {
                temprature: response.body.currently.temprature,
                precipProbability: response.body.currently.precipProbability,
                summary: response.body.daily.data[0].summary
            });
        }
    });
}


module.exports = weather;