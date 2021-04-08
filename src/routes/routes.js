const express = require('express');
const path = require('path');
const { redirect } = require('statuses');

const routes = express.Router();

// EJS ROUTES
// Caso queira usar por padrão o template ejs descomente tocódigo abaixo
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
      return res.render('profile', { profile: Profile.data });
    },
    update(req, res) {
      const data = req.body;

      // Definir quantas semanas tem um ano: 52
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

      return res.redirect('/profile');
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
      created_at: Date.now(),
    },
    {
      id: 2,
      name: 'OneTwo Project',
      "daily-hours": 3,
      "total-hours": 7,
      created_at: Date.now(),
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
          budget: Job.services.calculateBudget(job, Profile.data['value-hour'])
        };
      })

      return res.render('index', {
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
        created_at: Date.now(),
      });

      return res.redirect('/');
    },
    save(req, res) {
      return res.render('job');
    },
    show(req, res) {
      const { id } = req.params;

      const job = Job.data.find(job => job.id === Number(id));

      if (!job) return res.send('Job not found!');

      job.budget = Job.services.calculateBudget(job, Profile.data['value-hour']);

      return res.render('job-edit', { job });
    },
    update(req, res) {
      const { id } = req.params;

      const job = Job.data.find(job => job.id === Number(id));

      if (!job) return res.send('Job not found!');

      const updatedJob = {
        ...job,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
      }

      Job.data = Job.data.map(job => {
        if(job.id === Number(id)) job = updatedJob;

        return job
      });

      res.redirect(`/job/${id}/edit`);
    },
    delete(req, res) {
      const { id } = req.params;

      Job.data = Job.data.filter(job => job.id !== Number(id));

      return res.redirect('/');
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
    },
    calculateBudget: (job, valueHour) => valueHour * job['total-hours']
  }
}

// routes.get('/', Job.controllers.index);
// routes.get('/job', Job.controllers.save);
// routes.post('/job', Job.controllers.create);
// routes.get('/job/:id/edit', Job.controllers.show);
// routes.post('/job/:id/edit', Job.controllers.update);
// routes.post('/job/:id/delete', Job.controllers.delete);

// routes.get('/profile', Profile.controllers.index);
// routes.post('/profile', Profile.controllers.update);
// -------------------------------------------------------------


// // Handlebars ROUTES

// const Profile = {
//   data: {
//     name: 'Gustavo Sorati',
//     avatar: 'https://github.com/gustavo-sorati.png',
//     "monthly-budget": 3000,
//     "days-per-week": 10,
//     "hours-per-day": 5,
//     "vacation-per-year": 4,
//     "value-hour": 75
//   },
//   controllers: {
//     index(req, res) {
//       return res.render('/profile', { profile: Profile.data });
//     },
//     update(req, res) {
//       const data = req.body;

//       // Definir quantas semanas tem um ano: 52
//       const weeksPerYear = 52;

//       const weeksPerMonth = (weeksPerYear - Profile.data['vacation-per-year']) / 12;
//       const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

//       const monthlyTotalHours = weekTotalHours * weeksPerMonth;

//       const valueHour = data["monthly-budget"] / monthlyTotalHours;

//       Profile.data = {
//         ...Profile.data,
//         ...req.body,
//         "value-hour": valueHour
//       };

//       return res.redirect('/profile')
//     }
//   }
// }

// const Job = {
//   data: [
//     {
//       id: 1,
//       name: 'Pizzaria Guloso',
//       "daily-hours": 2,
//       "total-hours": 60,
//       created_at: Date.now(),
//     },
//     {
//       id: 2,
//       name: 'OneTwo Project',
//       "daily-hours": 3,
//       "total-hours": 7,
//       created_at: Date.now(),
//     }
//   ],
//   controllers: {
//     index(req, res) {
//       const updatedJobs = Job.data.map(job => {
//         const remaining = Job.services.remainingDays(job);
//         const status = remaining <= 0 ? 'done' : 'progress';

//         return {
//           ...job,
//           remaining,
//           status,
//           budget: Job.services.calculateBudget(job, Profile.data['value-hour'])
//         };
//       })

//       return res.render('index', {
//         jobs: updatedJobs
//       })
//     },
//     create(req, res) {
//       const job = req.body;
//       let id;

//       if (Job.data.length > 0)
//         id = Job.data[Job.data.length - 1].id + 1;
//       else
//         id = 1;

//       Job.data.push({
//         id,
//         ...job,
//         created_at: Date.now(),
//       });

//       return res.redirect('/');
//     },
//     save(req, res) {
//       return res.render('job');
//     },
//     show(req, res) {
//       const { id } = req.params;

//       const job = Job.data.find(job => job.id === Number(id));

//       if (!job) return res.send('Job not found!');

//       job.budget = Job.services.calculateBudget(job, Profile.data['value-hour']);

//       return res.render('job-edit', { job });
//     },
//     update(req, res) {
//       const { id } = req.params;
//       const data = req.body.data;

//       const job = Job.data.find(job => job.id === Number(id));

//       if (!job) return res.send('Job not found!');

//       const updatedJob = {
//         ...job,
//         name: req.body.name,
//         "daily-hours": req.body["daily-hours"],
//         "total-hours": req.body["total-hours"],
//       }

//       Job.data = Job.data.map(job => {
//         if(job.id === Number(id)) job = updatedJob;

//         return job
//       });

//       res.redirect(`/job/${id}/edit`);
//     },
//     delete(req, res) {
//       const { id } = req.params;

//       Job.data = Job.data.filter(job => job.id !== Number(id));

//       return res.redirect('/');
//     }
//   },
//   services: {
//     remainingDays(job) {
//       const remainingDays = Math.floor(job['total-hours'] / job['daily-hours']);
//       const createdDate = new Date(job.created_at);
//       const dueDay = createdDate.getDate() + remainingDays;
//       const dueDate = createdDate.setDate(dueDay);

//       const timeDiffInMS = dueDate - Date.now();

//       // Transformar ms em dias
//       const daysInMs = 1000 * 60 * 60 * 24;
//       const dayDiff = Math.floor(timeDiffInMS / daysInMs);

//       return dayDiff;
//     },
//     calculateBudget: (job, valueHour) => valueHour * job['total-hours']
//   }
// }

routes.get('/', Job.controllers.index);
routes.get('/job', Job.controllers.save);
routes.post('/job', Job.controllers.create);
routes.get('/job/:id/edit', Job.controllers.show);
routes.post('/job/:id/edit', Job.controllers.update);
routes.post('/job/:id/delete', Job.controllers.delete);

routes.get('/profile', Profile.controllers.index);
routes.post('/profile', Profile.controllers.update);

module.exports = routes;
