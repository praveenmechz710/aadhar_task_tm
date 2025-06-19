const express = require('express');
const router = express.Router();
const con = require('../../config/db');


exports.insertAadhar = async(req,res)=>{
    try{
        const{first_name,last_name,dob,mobile_number,email_id,address,gender,city_name,state_name} = req.body;
        const[result] = await con.execute(
            'call aadhar_creation(?,?,?,?,?,?,?,?,?)',
            [first_name,last_name,dob,mobile_number,email_id,address,gender,city_name,state_name]
        );
        res.json({id:result.insertid,message:"Aadhar created"});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
};


