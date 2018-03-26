// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
let faker = require('faker');

let mongoose = require('mongoose');

let Car = mongoose.model('Car', {
    name: String
});

mongoose.connect('mongodb://localhost:27017/TodoApp');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    let newCar = new Car({
        name: faker.company.companyName()
    });

    Car.remove().then(() => {
        newCar.save().then(
            () => {
                console.log('Done')
                mongoose.disconnect();
            }
        ).catch((err) => {
            console.log('Error:', err);
            mongoose.disconnect();
        });
    })


});


