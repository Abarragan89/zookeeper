"use strict";

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

const { animals } = require('./data/animals');
const PORT = process.env.PORT || 3001;


function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
    // Filter by personality traits
    if (query.personalityTraits) {
        // If only one personality trait, its a string that needs to be put into an array.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        // If there is more than one trait, then it is already an array
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits(what the user is searched) array:
        personalityTraitsArray.forEach(trait => {
            filteredResults = filteredResults.filter(animal =>
                // will accept any animal that doesn't NOT have (i.e. has)  the trait. 
                animal.personalityTraits.indexOf(trait) !== -1
            )
        })
    }
    // Filter by diet, species, and name
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species)
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name)
    }
    return filteredResults;
}

function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
        return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
}

function findById (id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id ===id)[0];
    return result;
}
function createNewAnimal(body, animalsArray) {
    // main code
    const animal = body; 
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'),
        JSON.stringify({ animals: animalsArray }, null, 2)
    );
    // return finished code to post route for response
    return animal;
}






app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
    res.json(result);
});

app.post('/api/animals', (req, res) => {
    // set id based on what the next index of the array will be 
    req.body.id = animals.length.toString();
    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal)
    }
    // add animal to json file and animals array in this function
    const animal = createNewAnimal(req.body, animals);
    res.json(animals)
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});

