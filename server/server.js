const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;
const router = require('./routes/router')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./server/public'));
// app.use(express.urlencoded({ extended: true })); <-- Used to test initial server setup
// app.use(express.json());

// ROUTES
app.use('/tasks', router)

// Start listening for requests on a specific port
app.listen(port, () => {
  console.log('listening on port', port);
});