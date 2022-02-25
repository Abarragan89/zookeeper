"use strict";

const express = require('express');
const app = express();
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

function findById (id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id ===id)[0];
    return result;
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

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});

