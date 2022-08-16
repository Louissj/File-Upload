var mongoose  =  require('mongoose');

var accountSchema = new mongoose.Schema({

    policy_number:{
        type:String
    },
    userType:{
        type:String
    },
    account_name:{
        type:String
    },
    account_type:{
        type:String
    },
    email:{
        type:String
    },
    Applicant_ID:{
        type:String
    },
    
});
module.exports = mongoose.model('useraccount', accountSchema);