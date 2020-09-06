module.exports = (app, allModels) => {
  // require the controllers
  const usersCallbacks = require('./controllers/users')(allModels);
  // routes
  app.get('/', usersCallbacks.displayMain);
  app.post('/user', usersCallbacks.checkCredentials)
  app.post('/addItem', usersCallbacks.logFood)
  app.get('/logout', usersCallbacks.logOut)
  app.delete('/remove', usersCallbacks.removeFood)
  app.get('/register', usersCallbacks.registerForm)
  app.post('/newUser', usersCallbacks.createUser)
  app.get('/err', usersCallbacks.backToMain)
  app.get('/success', usersCallbacks.directToLogin)
  app.get('/userNotFound', usersCallbacks.directToLogin)
  app.get('/userExists', usersCallbacks.backToRegister)

  };