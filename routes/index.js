const Router = require("express").Router();
const VerifyToken = require('./verifyToken');

/* Get home page. */
Router.get('/', VerifyToken, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = Router;
