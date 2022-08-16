var mongoose  =  require('mongoose');

var agentSchema = new mongoose.Schema({

    policy_number:{
        type:String
    },
    agent:{
        type:String
    },
    producer:{
        type:String
    },
    agency_ID:{
        type:Number
    },
    company_name:{
        type:String
    },
    category_name:{
        type:String
    },
    
});
module.exports = mongoose.model('agent', agentSchema);