"use strict";

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// serve all the necessary static front-end files
app.use(express.static('public'));

const { animals } = require('./data/animals');
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    // only job is to send a file. 'sendFile'.
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'))
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});

