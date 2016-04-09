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
            type: String
        },
        rule2Winner: { 
            type: Number
        },
        rule3Winner: { 
            type: String
        },
        bonusWinner: { 
            type: String
        }
    },
    { 
        timestamps: {} 
    }
);


// create the model for matches for populating database
module.exports = mongoose.model('Predictions', predictionSchema);