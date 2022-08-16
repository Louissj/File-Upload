const express = require("express");
const router = express.Router();
const multer = require("multer");
var agentModel = require('../models/agent');
var accountModel = require('../models/userAccount');
var lobModel = require('../models/lob');
var policyModel = require('../models/policy');
var custmerModel = require('../models/customer');
var csv         = require('csvtojson');

var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

var uploads = multer({storage:storage});
router.post('/',uploads.single('csv'),(req,res)=>{
    //convert csvfile to jsonArray   
   csv()
   .fromFile(req.file.path)
   .then((jsonObj)=>{
      
       //customer data
       var customer =[];
       var agent = [];
       var account = [];
       var lob = [];
       var policy = [];
       jsonObj.map(data =>{
           
       var customerData = {
       policy_number:data.policy_number,email:data.email,gender:data.gender,
       firstname:data.firstname,city:data.city, phone:data.phone,address:data.address,state:data.state, 
       zip:data.zip,dob:data.dob
       };
       customer.push(customerData);
   
       var agentData = {
           policy_number : data.policy_number,
           agent:data.agent,
           producer: data.producer,
           agency_ID:data.agency_ID,
           company_name:data.company_name,
           category_name:data.category_name,
       };
       agent.push(agentData);
   
       var accountData ={
           policy_number:data.policy_number,
           userType:data.userType,
           account_name:data.account_name,
           account_type:data.account_type,
           email:data.email,
           Applicant_ID:data.Applicant_ID,
       };
       account.push(accountData);
   
       var lobData = {
           policy_number:data.policy_number,
           csr:data.csr,
           Primary:data.Primary,
           agency_id:data.agency_id,
           hasActive_ClientPolicy:data.hasActive_ClientPolicy,
           Applicant_ID:data.Applicant_ID,
       };
       lob.push(lobData);
   
       var policyData = {
           policy_number:data.policy_number,
           policy_mode:data.policy_mode,
           premium_amount_written:data.premium_amount_written,
           premium_amount:data.premium_amount,
           policy_type:data.policy_type,
           policy_start_date:data.policy_start_date,
           policy_end_date:data.policy_end_date,
           agency_id:data.agency_id,
           hasActive_ClientPolicy:data.hasActive_ClientPolicy,
           Applicant_ID:data.Applicant_ID 
       };
       policy.push(policyData);
   
       });
   
       custmerModel.insertMany(customer,(err,data)=>{
           if(err){
               console.log(err);
           }
       });
       agentModel.insertMany(agent,(err,data) =>{
           if(err){
               console.log(err);
           }
       });
       accountModel.insertMany(account,(err,data) =>{
           if(err){
               console.log(err);
           }
       });
       lobModel.insertMany(lob,(err,data) =>{
           if(err){
               console.log(err);
           }
       });
       policyModel.insertMany(policy,(err,data) =>{
           if(err){
               console.log(err);
           }else{
               res.redirect('/');
           }
       });
      });
   });

   module.exports = router;