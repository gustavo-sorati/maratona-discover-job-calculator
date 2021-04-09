const express = require('express');

const ProfileController = require('../controllers/ProfileController');
const JobController = require('../controllers/JobController');
const DashboardController = require('../controllers/DashboardController');

const routes = express.Router();

routes.get('/', DashboardController.index);
routes.get('/job', JobController.create);
routes.post('/job', JobController.save);
routes.get('/job/:id/edit', JobController.show);
routes.post('/job/:id/edit', JobController.update);
routes.post('/job/:id/delete', JobController.delete);

routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);

module.exports = routes;
