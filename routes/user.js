const express = require("express");
const router = express.Router();
var agentModel = require('../models/agent');
var accountModel = require('../models/userAccount');
var lobModel = require('../models/lob');
var policyModel = require('../models/policy');
var custmerModel = require('../models/customer');


router.get('/users/:page',(req,res)=>{
    var perPage = 9;
    var page = req.params.page || 1; 
    custmerModel
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, data) {
        custmerModel.count().exec(function(err, count) {
            if (err) return next(err)
            res.render('demo', {
                data:data,
                accountData:'',
                agentData:'',
                lobData:'',
                policyData:'',
                current: page,
                pages: Math.ceil(count / perPage)
            });
        });
    }); 
});

router.get('/users/edit/:policy',(req,res)=>{
    custmerModel.findOne({policy_number:req.params.policy},(err, datas)=>{
        if (err) return next(err);
            res.render('userForm', {
                datas:datas
            });
    }); 
});

router.post('/users/update/:policy',(req,res) =>{
    custmerModel.findOneAndUpdate({policy_number:req.params.policy},{$set:{firstname:req.body.name}},
        (err, datas)=>{
        if (err) return next(err);
        res.redirect('/');
    }); 
});

router.get('/users/delete/:policy',(req,res)=>{
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