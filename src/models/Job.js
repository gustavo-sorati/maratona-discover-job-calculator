const Database = require('../database/config');

module.exports = {
  async get(){
    const db = await Database();

    const jobs = await db.all(`SELECT * FROM jobs`);

    await db.close();

    return jobs.map(job => ({
        id: job.id,
        name: job.name,
        "daily-hours": job.daily_hours,
        "total-hours": job.total_hours,
        created_at: job.created_at
    }));
  },
  async create(job) {
    const db = await Database();

    db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
      ) VALUES (
        "${job.name}",
        ${job['daily-hours']},
        ${job['total-hours']},
        ${job.created_at}
      )`)

    await db.close();
  },
  async update(updatedJob, id) {
    const db = await Database();

    await db.run(`UPDATE jobs SET
      name = "${updatedJob.name}",
      daily_hours = ${updatedJob["daily-hours"]},
      total_hours = ${updatedJob["total-hours"]}
      WHERE id = ${id}
    `)

    await db.close();
  },
  async delete(id){
    const db = await Database();

    await db.run(`DELETE FROM jobs WHERE id = ${id} `);

    await db.close();
  }
}
