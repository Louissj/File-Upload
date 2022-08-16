const express = require("express");
const router = express.Router();
var agentModel = require('../models/agent');


router.get('/agent/:page',(req,res)=>{
    var perPage = 9;
    var page = req.params.page || 1; 
    agentModel
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, agentData) {
        agentModel.count().exec(function(err, count) {
            if (err) return next(err)
            res.render('demo', {
                data:'',
                accountData:'',
                lobData:'',
                policyData:'',
                agentData:agentData,
                current: page,
                pages: Math.ceil(count / perPage)
            });
        });
    }); 
});

module.exports = router;