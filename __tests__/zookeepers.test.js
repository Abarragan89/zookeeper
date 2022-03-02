"use strict"

const fs = require('fs');

const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers');

const { zookeepers } = require('../data/zookeepers.json');
jest.mock('fs');

test('create a zookeeper', () => {
    const zookeeper = createNewZookeeper( {name: 'bob', age: 21, favoriteAnimal: 'Zebra'}, zookeepers);

    expect(zookeeper.name).toBe('bob');
    expect(zookeeper.age).toBe(21);
    expect(zookeeper.favoriteAnimal).toBe('Zebra')
});

test('filter by query', () => {
    const startingZookeepers = [
        {
            name: 'bob', 
            age: 21,
            favoriteAnimal: 'Zebra'
        },
        {
            name: 'Mike',
            age: 35,
            favoriteAnimal: 'dog'
        }
    ];
    const updatedZookeepers = filterByQuery({name: "Mike"}, startingZookeepers);

    expect(updatedZookeepers.length).toBe(1);
});

test('find by id', () => {
    const startingZookeepers = [
        {
            name: 'bob', 
            age: 21,
            favoriteAnimal: 'Zebra',
            id: 21
        },
        {
            name: 'Mike',
            age: 35,
            favoriteAnimal: 'dog',
            id: 2
        }
    ];

    const result = findById(2, startingZookeepers)
    expect(result.name).toBe('Mike');
})


test('validate zookeeper', () => {
    const zookeeper = 
    {
        name: 'Mike',
        age: 35,
        favoriteAnimal: 'dog',
        id: 2
    }
    const invalidZookeeper =
    {
        name: 'Mike',
        favoriteAnimal: 'dog',
        id: 2
    }

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);``
})
