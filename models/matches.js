// app/models/match.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our match model
var matchSchema = mongoose.Schema(
    {
        matchNum: { 
            type: String
        },
        date : { 
            type: Date
        },
        venue: {
            type: String
        },
        homeTeam: { 
            type: String 
        },
        awayTeam: { 
            type: String 
        },
        bonusRule: { 
            type: String
        },
        rule1Winner: { 
            type: String
        },
        rule2Winner: { 
            type: Number
        },
        rule3Winner: { 
            type: [String]
        },
        bonusWinner: { 
            type: [String]
        },
        isComplete: {
            type: Boolean,
            default: false
        }
    },
    { 
        timestamps: {} 
    }
);


// create the model for matches for populating database
module.exports = mongoose.model('Matches', matchSchema);