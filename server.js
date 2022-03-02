"use strict";
// this require statements will read the index.js in each folder
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes')


const express = require('express');
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// serve all the necessary static front-end files
app.use(express.static('public'));

// Anytime client navigates to 'hostname.com/api', the app will use the router we set up in apiRoutes (which just imports and uses the functions form animalRoutes)
app.use('/api', apiRoutes);

// Anytime client 
app.use('/', htmlRoutes);


const { animals } = require('./data/animals');
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});

