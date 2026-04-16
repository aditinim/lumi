const mongoose = require('mongoose');

// Define the User Schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: [true, "Username is unique"],
    },
    email: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username is unique"],
    },
    password: {
        type: String,
        required: true,
        select: false // Prevents password from being returned in queries by default
    }
    // profileImage: {
    //     type: String,
    //     default: 'default.png'
    // },
    // // Array of ObjectIds to link to the Liked Songs or Moods
    // likedSongs: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'song'
    // }],
    // playlist: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'playlist'
    // }]
}, { timestamps: true }); // Automatically adds createdAt and updatedAt


const userModel= mongoose.model("user", userSchema); 
// userSchema.pre("save", function (next) {})
// userSchema.post("save", function (next) {})

module.exports = userModel;