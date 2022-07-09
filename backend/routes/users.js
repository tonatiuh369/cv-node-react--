const userRoutes = (app, fs) => {
    // variables
    const dataPath = './data/data_resume.json'; //at http://localhost:3100/users | See server.js to verify the port
    
    ///Sometimes axios gets blocked by CORS, so we need to bypass that using this block of code:
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
      });

    // READ
    app.get('/users', (req, res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
  
        res.send(JSON.parse(data));
      });
    });
  };
  
  module.exports = userRoutes;