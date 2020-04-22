const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const gardensRoute = require("./routes/gardens");
const plantsRoute = require("./routes/plants");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("api/users", usersRoute);
app.use("api/gardens", gardensRoute);
app.use("api/plants", plantsRoute);
app.use("api/auth", authRoute);

/* For Deploying */
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

app.set('port', (process.env.PORT || 3001));
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`);
})

module.exports = app;
