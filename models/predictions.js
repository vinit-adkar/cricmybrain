// app/models/match.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our match model
var predictionSchema = mongoose.Schema(
    {
        matchId : { 
            type: String
        },
        userId : { 
            type: String
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
        }
    },
    { 
        timestamps: {} 
    }
);


// create the model for matches for populating database
module.exports = mongoose.model('Predictions', predictionSchema);