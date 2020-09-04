console.log("index.js starting up")

const express = require ('express');
const app = express();
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

//Set up middleware
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//Set react-views as default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

//Database
const allModels = require('./db');

//Routes
const setRoutes = require('./routes');
//Pass the app and models to routes
setRoutes(app, allModels);

//Listen to requests on port 3000
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));

let onClose = function(){
  server.close(() => {
    console.log('Process terminated')
    allModels.pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);