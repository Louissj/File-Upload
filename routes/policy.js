const express = require("express");
const router = express.Router();
var agentModel = require('../models/agent');
var accountModel = require('../models/userAccount');
var lobModel = require('../models/lob');
var policyModel = require('../models/policy');
var custmerModel = require('../models/customer');

router.get('/policy/:page',(req,res)=>{
    var perPage = 9;
    var page = req.params.page || 1; 
    policyModel
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, policyData) {
        policyModel.count().exec(function(err, count) {
            if (err) return next(err)
            res.render('demo', {
                data:'',
                accountData:'',
                agentData:'',
                lobData:'',
                policyData:policyData,
                current: page,
                pages: Math.ceil(count / perPage)
            });
        });
    }); 
});

router.get('/policy/edit/:policy',(req,res)=>{
    policyModel.findOne({policy_number:req.params.policy},(err, datas)=>{
        if (err) return next(err);
            res.render('policy', {
                datas:datas
            });
    }); 
});

router.post('/policy/update/:policy',(req,res) =>{
    policyModel.findOneAndUpdate({policy_number:req.params.policy},{$set:{policy_mode:req.body.policy_mode, premium_amount:req.body.premium_amount, policy_type:req.body.policy_type, agency_id:req.body.agency_id}},
        (err, datas)=>{
        if (err) return next(err);
        res.redirect('/');
    }); 
});

router.get('/policy/delete/:policy',(req,res)=>{
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