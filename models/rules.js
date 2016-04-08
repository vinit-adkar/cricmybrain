// app/models/rule.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our rule model
var ruleSchema = mongoose.Schema({
    ruleNum : { 
        type: String, 
        unique: true 
    },
    ruleType : { 
        type: String
    },
    ruleDesc : {
        type: String,
        unique: true
    },
    ruleFunction : {
        type: String,
        unique: true
    },
    ruleCriteria : { 
        type: String, 
    },
    range : { 
        type: String
    }
});


// create the model for rules for populating datatbase
module.exports = mongoose.model('Rules', ruleSchema);