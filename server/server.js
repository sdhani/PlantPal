const express = require('express');
const bodyParser = require('body-parser'); /* middleware; parse response body */
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan'); /* dev tools */
const dotenv = require('dotenv').config(); /* hook up environment vars */
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const USERS_ROUTES =  require("./api/users");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(
  createProxyMiddleware("/api", {
    target: process.env.PORT,
    pathRewrite: {
      "^/api": "/"
    },
    changeOrigin: true
  })
);

app.use("/users", USERS_ROUTES);

app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`);
})