const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weather = require('./utils/weather');
const geocode = require('./utils/geocode');

const port = process.env.PORT || 3000;

//Path configs
const app = express();
const publicDirPath = path.join(__dirname, '../public');
const viewDirPath = path.join(__dirname, '../templates/views');
const partialsDirPath = path.join(__dirname, '../templates/partials');
app.use(express.static(publicDirPath)); 

//hbs configs 
app.set('view engine', 'hbs');
app.set('views', viewDirPath);
hbs.registerPartials(partialsDirPath);

//Routes
app.get('', (req, res) => {
    res.render('index', {
        pageTitle: 'Home',
        pageContent: 'This is some content for the homepage'
    });
});

app.get('/get-weather', (req, res)=> {
    const location = req.query.location;
    let response = {};
    geocode(location, (error, {longitude, latitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }
        weather(longitude, latitude, (error, { summary } = {}) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: summary,
                location: location,
                address: req.query.location
            });
        })
    });
});

app.get('/weather', (req, res)=> {
    res.render('weather', {
        pageTitle: 'Weather'
    });
});

app.get('/about', (req, res)=> {
    res.render('about', {
        pageTitle: 'About',
        pageContent: 'This is some content for the about page'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        pageTitle: '404',
        pageContent: 'Lost my friend, you are.'
    });
});




app.listen(port, () => {
    console.log("Listening on port "+ port);
});