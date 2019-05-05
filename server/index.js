const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());


app.use('/api', routes);

//Set Port
const port = process.env.PORT || '43015';
console.log("Listening at " + port);

app.listen(port)