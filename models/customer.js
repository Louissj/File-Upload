var mongoose  =  require('mongoose');

var cutomerSchema = new mongoose.Schema({
    policy_number:{
        type:String
    },
    email:{
        type:String
    },
    gender:{
        type:String
    },
    firstname:{
        type:String
    },
    city:{
        type:String
    },
    phone:{
        type:String
    },
    address:{
        type:String
    },
    state:{
        type:String
    },
    zip:{
        type:String
    },
    dob:{
        type:String
    }
});
module.exports = mongoose.model('customerRecords', cutomerSchema);