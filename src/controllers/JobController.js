const Job = require('../models/Job');
const Profile = require('../models/Profile');

const JobUtils = require('../utils/JobUtils');

module.exports = {
  create(req, res) {
    return res.render('job');
  },
  async save(req, res) {
    const job = req.body;

    await Job.create({
      ...job,
      created_at: Date.now(),
    })

    return res.redirect('/');
  },
  async show(req, res) {
    const jobs = await Job.get();

    const {id} = req.params;

    const job = jobs.find(job => job.id === Number(id));

    if (!job) return res.send('Job not found!');

    const profile = await Profile.get();
    job.budget = JobUtils.calculateBudget(job, profile['value-hour']);

    return res.render('job-edit', { job });
  },
  async update(req, res) {
    const {id} = req.params;

    const updatedJob = {
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
    }

    await Job.update(updatedJob, id);

    res.redirect(`/job/${id}/edit`);
  },
  async delete(req, res) {
    const {id} = req.params;

    await Job.delete(id);

    return res.redirect('/');
  }
}
