const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.json({ message: `It's ok` });
});

app.listen(3000, () => {
  console.log('Server is running in port: 3000');
});
