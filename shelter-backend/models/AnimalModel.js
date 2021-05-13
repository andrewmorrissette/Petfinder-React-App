import mongoose from 'mongoose'

const animalModel = mongoose.Schema({
    type: String,
    name: String,
    breed: String,
    age: Number,
    description: String,
    shelter: String,
    traits: Array,
    imgNames: Array
})

export default mongoose.model('animals', animalModel)