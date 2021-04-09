const Job = require('../models/Job');
const Profile = require('../models/Profile');

const JobUtils = require('../utils/JobUtils');

module.exports = {
  create(req, res) {
    return res.render('job');
  },
  save(req, res) {
    const jobs = Job.get();

    const job = req.body;
    let lastId;

    if (jobs.length > 0)
      lastId = jobs[jobs.length - 1].id;
    else
      lastId = 0;

    jobs.push({
      id: lastId + 1,
      ...job,
      created_at: Date.now(),
    });

    return res.redirect('/');
  },
  show(req, res) {
    const jobs = Job.get();

    const {id} = req.params;

    const job = jobs.find(job => job.id === Number(id));

    if (!job) return res.send('Job not found!');

    const profile = Profile.get();
    job.budget = JobUtils.calculateBudget(job, profile['value-hour']);

    return res.render('job-edit', { job });
  },
  update(req, res) {
    const jobs = Job.get();
    const {id} = req.params;

    const job = jobs.find(job => job.id === Number(id));

    if (!job) return res.send('Job not found!');

    const updatedJob = {
      ...job,
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
    }

    const newJobs = jobs.map(job => {
      if (job.id === Number(id)) job = updatedJob;

      return job;
    });

    Job.update(newJobs);

    res.redirect(`/job/${id}/edit`);
  },
  delete(req, res) {
    const {id} = req.params;

    Job.delete(id);

    return res.redirect('/');
  }
}
