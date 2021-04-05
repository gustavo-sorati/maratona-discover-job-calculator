const express = require('express');
const routes = require('./routes/routes');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// ejs
app.set('view engine', 'ejs');


// handlebars
// app.engine('hbs', exphbs({
  //   extname: 'hbs',
  //   defaultLayout: null,
  //   layoutsDir: path.join(__dirname, 'views', 'hbs'),
  //   partialsDir: path.join(__dirname, 'views', 'hbs'),
  // }));
  // app.set('view engine', 'hbs');
  // app.set('views', path.join(__dirname, 'views', 'hbs'));
  
  app.use(express.static('public'));
  
  app.use(express.json());
  app.use(routes);

app.listen(3000, () => {
  console.log('Server is running in port: 3000');
});