const Router = require("express").Router();

/* Get home page. */
Router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = Router;
