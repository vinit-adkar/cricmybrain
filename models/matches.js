// app/models/match.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our match model
var matchSchema = mongoose.Schema({
    matchNum : { 
        type: String
    },
    date : { 
        type: Date
    },
    startTimeGMT : {
        type: String
    },
    venue : {
        type: String
    },
    homeTeam : { 
        type: String, 
    },
    awayTeam: { 
        type: String, 
    },
    rule1: { 
        type: String,
    },
    rule2: { 
        type: String,
    },
    rule3: { 
        type: String,
    },
    bonusQ: { 
        type: String,
    },
    rule1Winner: { 
        type: String,
    },
    rule2Winner: { 
        type: Number,
    },
    rule3Winner: { 
        type: [String],
    },
    bonusWinner: { 
        type: [String],
    }
});


// create the model for matches for populating database
module.exports = mongoose.model('Matches', matchSchema);