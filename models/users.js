// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema(
    {
        email : { 
            type: String, 
            required: true,
            unique: true 
        },
        password : { 
            type: String,
            required: true 
        },
        name : { 
            type: String, 
            required: true 
        },
        teamname: { 
            type: String, 
            required: true
        },
        admin: { 
            type: Boolean,
            default: false
        },
        points: {
            type: Number,
            default: 0
        },
        predictions: {
            type: Number,
            default: 0
        },
        range: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: {}
    }
);

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);