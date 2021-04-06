const express = require('express');
const routes = require('./routes/routes');
const exphbs = require('express-handlebars');
const path = require('path');

const server = express();


// ejs
server.set('view engine', 'ejs');


// handlebars
// server.engine('hbs', exphbs({
  //   extname: 'hbs',
  //   defaultLayout: null,
  //   layoutsDir: path.join(__dirname, 'views', 'hbs'),
  //   partialsDir: path.join(__dirname, 'views', 'hbs'),
  // }));
  // server.set('view engine', 'hbs');
  // server.set('views', path.join(__dirname, 'views', 'hbs'));
  
  server.use(express.static('public'));
  server.use(express.urlencoded({ extended: true }));
  server.use(routes);

server.listen(3000, () => {
  console.log('Server is running in port: 3000');
});