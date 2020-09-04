module.exports = (app, allModels) => {
  // require the controllers
  const usersCallbacks = require('./controllers/users')(allModels);
  // routes
  app.get('/', usersCallbacks.displayMain);
  app.post('/user', usersCallbacks.checkCredentials)
  app.post('/addItem', usersCallbacks.logFood)

  };