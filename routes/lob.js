const express = require("express");
const router = express.Router();
var agentModel = require('../models/agent');
var accountModel = require('../models/userAccount');
var lobModel = require('../models/lob');
var policyModel = require('../models/policy');
var custmerModel = require('../models/customer');


router.get('/lob/:page',(req,res)=>{
    var perPage = 9;
    var page = req.params.page || 1; 
    lobModel
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, lobData) {
        lobModel.count().exec(function(err, count) {
            if (err) return next(err)
            res.render('demo', {
                data:'',
                accountData:'',
                agentData:'',
                policyData:'',
                lobData:lobData,
                current: page,
                pages: Math.ceil(count / perPage)
            });
        });
    }); 
});


module.exports = router;