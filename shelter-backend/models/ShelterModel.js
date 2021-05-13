import mongoose from 'mongoose'

const shelterModel = mongoose.Schema({
    name: String,
    address: String,
    city: String,
    state: String,
    zipcode: String,
    telephone: String
})

export default mongoose.model('shelters', shelterModel )