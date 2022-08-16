const express = require("express");
const router = express.Router();
var agentModel = require('../models/agent');
var accountModel = require('../models/userAccount');
var lobModel = require('../models/lob');
var policyModel = require('../models/policy');
var custmerModel = require('../models/customer');



router.get('/account/:page',(req,res)=>{
    var perPage = 9;
    var page = req.params.page || 1; 
    accountModel
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, accountData) {
        accountModel.count().exec(function(err, count) {
            if (err) return next(err)
            res.render('demo', {
                data:'',
                agentData:'',
                lobData:'',
                policyData:'',
                accountData:accountData,
                current: page,
                pages: Math.ceil(count / perPage)
            });
        });
    }); 
});

router.get('/account/edit/:policy',(req,res)=>{
    accountModel.findOne({policy_number:req.params.policy},(err, datas)=>{
        if (err) return next(err);
            res.render('account', {
                datas:datas
            });
    }); 
});

router.post('/account/update/:policy',(req,res) =>{
    accountModel.findOneAndUpdate({policy_number:req.params.policy},{$set:{account_name:req.body.account_name, email:req.body.email, account_type:req.body.account_type}},
        (err, datas)=>{
        if (err) return next(err);
        res.redirect('/');
    }); 
});

router.get('/account/delete/:policy',(req,res)=>{
    custmerModel.deleteOne({policy_number:req.params.policy},(err, datas)=>{
        if (err) return next(err);
    }); 
    agentModel.deleteOne({policy_number:req.params.policy},(err,data) =>{
        if(err){
            console.log(err);
        }
    });
    accountModel.deleteOne({policy_number:req.params.policy},(err,data) =>{
        if(err){
            console.log(err);
        }
    });
    lobModel.deleteOne({policy_number:req.params.policy},(err,data) =>{
        if(err){
            console.log(err);
        }
    });
    policyModel.deleteOne({policy_number:req.params.policy},(err,data) =>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    });
});

module.exports = router;