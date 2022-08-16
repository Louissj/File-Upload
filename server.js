var express     = require('express');
var mongoose    = require('mongoose');
var path        = require('path');
var bodyParser  = require('body-parser');
var uploadRouter = require('./routes/fileUpload');
var userRouter = require('./routes/user');
var accountRouter = require('./routes/account');
var policyRouter = require('./routes/policy');
var agentRouter = require('./routes/agent');
var lobRouter = require('./routes/lob');


//connect to db
mongoose.connect('mongodb+srv://admin:h2rn3788sOVAkg3o@cluster0.uqrft.mongodb.net/Demo_NauticOn?retryWrites=true&w=majority',{useNewUrlParser:true})
.then(()=>console.log('connected to db'))
.catch((err)=>console.log(err))

//init app
var app = express();

//set the template engine
app.set('view engine','ejs');

//fetch data from the request
app.use(bodyParser.urlencoded({extended:false}));
//static folder
app.use(express.static(path.resolve(__dirname,'public')));

//default pageload
app.get('/', (req, res) =>{
    res.render('demo',{data:'',accountData:'',agentData:'',lobData:'',policyData:''});
});

app.use("/api/Upload",uploadRouter);
app.use("/api/user",userRouter);
app.use("/api/account",accountRouter);
app.use("/api/policy",policyRouter);
app.use("/api/agent",agentRouter);
app.use("/api/lob",lobRouter);
//assign port
var port = process.env.PORT || 3000;
app.listen(port,()=>console.log('server run at port '+port));
