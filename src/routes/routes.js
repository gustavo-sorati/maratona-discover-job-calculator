const express = require('express');
const path = require('path');

const routes = express.Router();

const basePath = path.join(__dirname, '..', 'views', 'ejs');

const profile = {
    name: 'Gustavo Sorati',
    avatar: 'https://github.com/gustavo-sorati.png',
    "monthly-budget": 3000,
    "days-per-week": 10,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75
}

const jobs = [
  {
    id: 1,
    name: 'Pizzaria Guloso',
    "daily-hours": 2,
    "total-hours": 60,
    created_at: Date.now()
  },
  {
    id: 2,
    name: 'OneTwo Project',
    "daily-hours": 3,
    "total-hours": 7,
    created_at: Date.now()
  }
];

function remainingDays(job){
  const remainingDays = Math.floor(job['total-hours'] / job['daily-hours']);
  const createdDate = new Date(job.created_at);
  const dueDay = createdDate.getDate() + remainingDays;
  const dueDate = createdDate.setDate(dueDay);

  const timeDiffInMS = dueDate - Date.now();

  // Transformar ms em dias
  const daysInMs = 1000 *  60 * 60 * 24;
  const dayDiff = Math.floor(timeDiffInMS / daysInMs);

  return dayDiff;
}

// EJS ROUTES
routes.get('/', (req, res) => {
  const updatedJobs = jobs.map(job => {
    const remaining = remainingDays(job);
    const status = remaining <= 0 ? 'done' : 'progress';

    return {
      ...job,
      remaining,
      status,
      budget: profile['value-hour'] * job['total-hours']
    };
  })

  return res.render(path.join(basePath, '/index.ejs'), {jobs : updatedJobs})
});
routes.get('/job', (req, res) => res.render(path.join(basePath, '/job.ejs')));
routes.post('/job', (req, res) => {

  const job = req.body;
  let id;

  if(jobs.length > 0)
    id = jobs[jobs.length - 1].id + 1;
  else
    id = 1;

  jobs.push({
    id,
    ...job,
    created_at: Date.now()
  });

  console.log(jobs)
  return res.redirect('/');
});
routes.get('/job/edit', (req, res) => res.render(path.join(basePath, '/job-edit.ejs')));
routes.get('/profile', (req, res) => res.render(path.join(basePath, '/profile.ejs'), { profile }));



// Handlebars ROUTES
// routes.get('/', (req, res) => res.render('index'));
// routes.get('/job', (req, res) => res.render('job'));
// routes.get('/job/edit', (req, res) => res.render('job-edit'));
// routes.get('/profile', (req, res) => res.render('profile'));

module.exports = routes;
