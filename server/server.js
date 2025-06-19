const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config({path:'../.env'});
const bodyParser = require('body-parser');
const routes = require("../routes/routes");
const cronroutes = require("../routes/cronServices")
const app = express();
app.use(cors());
app.use(bodyParser.json());

//Use the routes with a base url
app.use("/api",routes);

//use to routes with file upload
app.use('/uploads',express.static('uploads'));

app.listen(3000,(err)=>{
    if(err){
        console.log('Error is server connection');
    }
    else{
        console.log('Server running on the port 3000 successfully')
    }
})