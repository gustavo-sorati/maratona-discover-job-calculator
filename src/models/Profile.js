let data = {
  name: 'Gustavo Sorati',
  avatar: 'https://github.com/gustavo-sorati.png',
  "monthly-budget": 3000,
  "days-per-week": 10,
  "hours-per-day": 5,
  "vacation-per-year": 4,
  "value-hour": 75
};

module.exports = {
  get() {
    return data;
  },
  update(newData){
    data = newData;
  }
}
