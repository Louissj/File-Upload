var mongoose  =  require('mongoose');

var lobSchema = new mongoose.Schema({

    policy_number:{
        type:String
    },
    csr:{
        type:String
    },
    Primary:{
        type:String
    },
    agency_id:{
        type:Number
    },
    hasActive_ClientPolicy:{
        type:String
    },
    Applicant_ID:{
        type:String
    },
    
});
module.exports = mongoose.model('lob', lobSchema);