// app/models/match.js
// load the things we need
var mongoose = require('mongoose');
var Matches = require('../models/matches');
var User = require("../models/users");
var Schema = mongoose.Schema;

// define the schema for our match model
var predictionSchema = Schema(
    {
        matchId : { 
            type: Schema.Types.ObjectId,
            ref: "Matches"
        },
        userId : { 
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        rule1Winner: { 
            type: String,
            default: ""
        },
        rule2Winner: { 
            type: Number,
            default: 0
        },
        rule3Winner: { 
            type: String,
            default: ""
        },
        bonusWinner: { 
            type: String,
            default: ""
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


// create the model for matches for populating database
module.exports = mongoose.model('Predictions', predictionSchema);