const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now,
    },
    followings: [{
        user:{
          type: Schema.Types.ObjectId,
          ref: "User"
        }
    }],
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
})

module.exports = User = mongoose.model('users',UserSchema)