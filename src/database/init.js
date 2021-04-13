const Database = require('./config');

const initDb = {
  async init() {
    const db = await Database();

    await db.exec(`CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      avatar TEXT,
      name TEXT NOT NULL,
      monthly_budget INT,
      days_per_week INT,
      hours_per_day INT,
      vacation_per_year INT,
      value_hour INT
    )`);

    await db.exec(`CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      daily_hours INT,
      total_hours INT,
      created_at DATETIME
    )`);

    await db.run(`INSERT INTO profile (
      avatar,
      name,
      monthly_budget,
      days_per_week,
      hours_per_day,
      vacation_per_year,
      value_hour) VALUES (
      "Gustavo",
      "https://github.com/gustavo-sorati.png",
      3000,
      5,
      5,
      4,
      75
    );`);

    await db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at) VALUES (
      "Pizzaria Orlândia",
      2,
      1,
      1617514376018
    );`);

    await db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at) VALUES (
      "Farmácia Popular",
      3,
      47,
      1617514376018
    );`);

    await db.close();
  }
}

initDb.init();
