const express = require('express');
const path = require('path');
const { redirect } = require('statuses');

const routes = express.Router();

const basePath = path.join(__dirname, '..', 'views', 'ejs');

const Profile = {
  data: {
    name: 'Gustavo Sorati',
    avatar: 'https://github.com/gustavo-sorati.png',
    "monthly-budget": 3000,
    "days-per-week": 10,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75
  },
  controllers: {
    index(req, res) {
      return res.render(path.join(basePath, '/profile.ejs'), { profile : Profile.data });
    },
    update(req, res) {
      const data = req.body;

      const weeksPerYear = 52;
      const weeksPerMonth = (weeksPerYear - Profile.data['vacation-per-year']) / 12;
      const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

      const monthlyTotalHours = weekTotalHours * weeksPerMonth;

      const valueHour = data["monthly-budget"] / monthlyTotalHours;

      Profile.data = {
        ...Profile.data,
        ...req.body,
        "value-hour": valueHour
      };

      return res.redirect('/profile')
    }
  }
}

const Job = {
  data: [
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
  ],
  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map(job => {
        const remaining = Job.services.remainingDays(job);
        const status = remaining <= 0 ? 'done' : 'progress';

        return {
          ...job,
          remaining,
          status,
          budget: Profile.data['value-hour'] * job['total-hours']
        };
      })

      return res.render(path.join(basePath, '/index.ejs'), {
        jobs: updatedJobs
      })
    },
    create(req, res) {
      const job = req.body;
      let id;

      if (Job.data.length > 0)
        id = Job.data[Job.data.length - 1].id + 1;
      else
        id = 1;

      Job.data.push({
        id,
        ...job,
        created_at: Date.now()
      });

      return res.redirect('/');
    },
    createForm(req, res) {
      return res.render(path.join(basePath, '/job.ejs'));
    },
    editForm(req, res) {
      return res.render(path.join(basePath, '/job-edit.ejs'));
    }

  },
  services: {
    remainingDays(job) {
      const remainingDays = Math.floor(job['total-hours'] / job['daily-hours']);
      const createdDate = new Date(job.created_at);
      const dueDay = createdDate.getDate() + remainingDays;
      const dueDate = createdDate.setDate(dueDay);

      const timeDiffInMS = dueDate - Date.now();

      // Transformar ms em dias
      const daysInMs = 1000 * 60 * 60 * 24;
      const dayDiff = Math.floor(timeDiffInMS / daysInMs);

      return dayDiff;
    }
  }
}

// EJS ROUTES
routes.get('/', Job.controllers.index);
routes.get('/job', Job.controllers.createForm);
routes.post('/job', Job.controllers.create);
routes.get('/job/edit', Job.controllers.editForm);

routes.get('/profile', Profile.controllers.index);
routes.post('/profile', Profile.controllers.update);



// Handlebars ROUTES
// routes.get('/', (req, res) => res.render('index'));
// routes.get('/job', (req, res) => res.render('job'));
// routes.get('/job/edit', (req, res) => res.render('job-edit'));
// routes.get('/profile', (req, res) => res.render('profile'));

module.exports = routes;
