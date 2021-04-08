module.exports = {
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
