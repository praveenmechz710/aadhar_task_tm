const express = require('express');
const router = express.Router();
const con = require('../../config/db')
const {insertAadhar} = require('../registration/reg-ctrl');
const upload = require("../../middleware/upload");


router.post('/insert_aadhar',insertAadhar);


// API for  state wise aadhar count above 60

router.get('/state_wise_aadhar_count_above_60' ,async(req,res)=>{
try{
    const[rows] = await con.execute(
        'select sm.state_name,count(au.tid) as above_age60 from aadhar_user as au join state_master as sm on au.state_id = sm.tid where timestampdiff(year,dob,curdate())>60 group by sm.state_name'
    );
    res.json(rows);
}
catch(error){
    res.status(500).json({error:error.message});
}
});

// To get the statewise aadhar holder details
router.get('/State_wise_aadhar_holder',async(req,res)=>{
    try{
        const [rows] = await con.execute('select sm.state_name,count(au.tid) as aadhar_holders from aadhar_user as au join state_master as sm on au.state_id = sm.tid group by sm.state_name ');
        res.json(rows);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});

// To upload the file to the directory 
router.post('/upload/:email_id',upload.single('profile'),async(req,res)=>{
    const emailId = req.params.email_id;
    if(!req.file){
        return res.status(400).json({error:'No file uploaded'});
    }
    
    const filename = req.file.filename;
    try{
        await con.execute(
         'insert into upload_pp (email_id,profile_pic) values(?,?) on duplicate key update profile_pic = values(profile_pic)',
         [emailId,filename]
        );
          res.json({
        message:'File uploaded successfully',
        filename:req.file.filename,
        path:`/uploads/${req.file.filename}`
    });
    }
    catch(error){
        console.error('Error in saving picture',error.message);
        res.status(500).json({error:error.message});
    }
  
});

module.exports = router;