module.exports = (app, allModels) => {
  // require the controllers
  const usersCallbacks = require('./controllers/users')(allModels);
  // routes
  app.get('/', usersCallbacks.test);
  app.post('/user', usersCallbacks.checkCredentials)

  };