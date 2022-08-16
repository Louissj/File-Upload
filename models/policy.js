var mongoose  =  require('mongoose');

var ploicySchema = new mongoose.Schema({

    policy_number:{
        type:String
    },
    policy_mode:{
        type:String
    },
    premium_amount_written:{
        type:Number
    },
    premium_amount:{
        type:Number
    },
    policy_type:{
        type:String
    },
    policy_start_date:{
        type:String
    },
    policy_end_date:{
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
    } 
});
module.exports = mongoose.model('policies', ploicySchema);