const express = require('express');
const path = require('path');

const routes = express.Router();

const basePath = path.join(__dirname, '..', 'views', 'ejs');

const profile = {
    name: 'Gustavo Sorati',
    avatar: 'https://avatars.githubusercontent.com/u/22673655?v=4',
    "monthly-budget": 3000,
    "days-per-week": 10,
    "hours-per-day": 5,
    "vacation-per-year": 4
}

// EJS ROUTES 
routes.get('/', (req, res) => res.render(path.join(basePath, '/index.ejs')));
routes.get('/job', (req, res) => res.render(path.join(basePath, '/job.ejs')));
routes.get('/job/edit', (req, res) => res.render(path.join(basePath, '/job-edit.ejs')));
routes.get('/profile', (req, res) => res.render(path.join(basePath, '/profile.ejs'), { profile }));

// Handlebars ROUTES 
// routes.get('/', (req, res) => res.render('index'));
// routes.get('/job', (req, res) => res.render('job'));
// routes.get('/job/edit', (req, res) => res.render('job-edit'));
// routes.get('/profile', (req, res) => res.render('profile'));

module.exports = routes;