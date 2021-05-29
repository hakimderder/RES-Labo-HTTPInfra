var Chance = require('chance');
var chance = new Chance();

const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//     res.send(generateCountries())
// })
//
//
// app.listen(port, () => {
//     console.log(`Accepting HTTP requests on port ${port}`)
// })

app.get('/', function (req, res) {
    res.send(generateAnimals());
});

app.listen(3000, function () {
    console.log('Accepting HTTP requests on port 3000.');
});


function generateAnimals() {
    var numberOfAnimals = chance.integer({
        min: 0, max: 10
    });
    console.log(numberOfAnimals);
    var animals = [];
    for (var i = 0; i < numberOfAnimals; ++i) {
        var gender = chance.gender();
        animals.push({
			gender: gender,
            species: chance.animal(),
            name: chance.first({ gender: gender }),
            size: chance.floating({ min: 0, max: 10 })
        });
    }
    console.log(animals);
    return animals;
}