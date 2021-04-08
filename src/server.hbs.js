const express = require('express');
const routes = require('./routes/routes');
const exphbs = require('express-handlebars');
const path = require('path');

const server = express();

server.engine('hbs', exphbs({
  extname: 'hbs',
  defaultLayout: null,
  layoutsDir: path.join(__dirname, 'views', 'hbs'),
  partialsDir: path.join(__dirname, 'views', 'hbs', 'partials'),
  helpers: {
    toFixed: function (value, ext) {
      return value.toFixed(ext);
    },
    replace: function (value, ini, fin) {
      return value.replace(ini, fin)
    },
    ifCond: function (value, check, options) {
      if (value === check.toString()) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
  }
}));
server.set('view engine', 'hbs');
server.set('views', path.join(__dirname, 'views', 'hbs'));

server.use(express.static('public'));
server.use(express.urlencoded({
  extended: true
}));
server.use(routes);

server.listen(3000, () => {
  console.log('Server is running in port: 3000');
});
