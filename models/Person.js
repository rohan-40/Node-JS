const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type :String,
        require : true
    },
    age: {
        type : Number,
        require: true
    },
    work: {
        type: String,
        enum: ['chef','manager','waiter'],
        require: true
    },
    mobile: {
        type: Number,
        require: true,
    },
    email: {
        type: String,
        require:true,
        unique: true
    },
    address: {
        type: String,
        require: true
    },
    salary: {
        type: Number,
        require: true,
    }
});

const Person = mongoose.model('Person',personSchema);

module.exports = Person;