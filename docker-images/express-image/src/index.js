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
    res.send(generateCountries());
});

app.listen(3000, function () {
    console.log('Accepting HTTP requests on port 3000.');
});


function generateCountries() {
    var numberOfCountries = chance.integer({
        min: 1, max: 10
    });
    console.log(numberOfCountries);
    var countries = [];
    for (var i = 0; i < numberOfCountries; ++i) {
        var postal = chance.postcode();
        // var country = chance.country();
        countries.push({
            country: chance.country({full: true}),
            altitude: chance.altitude({min: 0, max: 3000}),
            postalCode: postal,
            coordinates: chance.coordinates()
        });
    }
    console.log(countries);
    return countries;
}