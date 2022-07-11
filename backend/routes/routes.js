// load up our new route for users
const userRoutes = require('./users');

const appRouter = (app, fs) => {
  // I've added in a default route here that handles empty routes
  // at the base API url
  app.get('/', (req, res) => {
    res.send('Welcome to the development api-server');
  });

  // run our user route module here to complete the connection
  userRoutes(app, fs);
};

// this line is unchanged
module.exports = appRouter;