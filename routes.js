module.exports = {
   configure: function(app) {
      app.get('/', function(req, res) {
         res.send('Library API is running');
      });

      app.get('/demo', function(req, res) {
         res.sendFile('demo/index.html', { root: __dirname })
      });

   }
};
