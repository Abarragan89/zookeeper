"use strict";

const router = require('express').Router();
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper 
} = require('../../lib/zookeepers');

const { zookeepers } = require('../../data/zookeepers.json');

router.get('/zookeepers', (req, res) => {
    let result = zookeepers;
    if (req.query) {
        result = filterByQuery(req.query, result);
    }
    res.json(result)
})

router.get('/zookeeper/:id', (req, res) => {
    const result = findById(req.params.id, zookeepers);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
})

// make a new zookeeper
router.post('/zookeepers', (req, res) => {
    // add id to the req before checking to see if it is valid. The id is made on the server side. 
    req.body.id = zookeepers.length.toString();
    if(!validateZookeeper(req.body)) {
        res.status(400).send('The zookeeper is not properly formatted.');
    } else {
        const zookeeper = createNewZookeeper(req.body, zookeepers);
        res.json(zookeeper);
    }
});

module.exports = router;