import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
const userModel = mongoose.Schema({
    username: String,
    password: String,
    shelter: String
})

userModel.plugin(passportLocalMongoose, {
    selectFields: 'username password shelter'
});
export default mongoose.model('users', userModel )