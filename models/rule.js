// app/models/rule.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our rule model
var ruleSchema = mongoose.Schema({

    local : {
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
        ruleFunc : {
            type: String,
            unique: true
        },
        ruleCriteria : { 
            type: String, 
        }
    }
});


// create the model for rules for populating datatbase
module.exports = mongoose.model('Rules', ruleSchema);