export default Job = {
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
  }
}
