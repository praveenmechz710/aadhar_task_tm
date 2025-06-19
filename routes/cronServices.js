const cron = require('node-cron');
const con = require('../config/db');
const nodemailer = require('nodemailer');

//configure email transpoter

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EmailUser,
        pass:process.env.EmailPass,
    },
});

//Schedule job to run daily at 9 am

cron.schedule("0 9 * * *",async() => {
    try{
        console.log("Running birthday wishes email job");


        //Fetch users whose birthday is today
        const [users] = await con.execute(
            "select first_name,last_name,email_id from aadhar_user where date_format(dob,'%m-%d') = date_format(curdate(),'%m-%d')"
        );

        if(users.length === 0){
            console.log('Today no birthdays')
        }

        //send emails
        users.forEach((user)=>{
            const mailOptions = {
                from: process.env.EmailUser,
                to: user.email_id,
                subject:"Happy Birthday!",
                text:'Dear ${user.first_name} , Happy Birthday!',
            };

            transporter.sendMail(mailOptions,(error,info) => {
                if (error){
                    console.error("Error sending email:",error);
                }
                else{
                    console.log('Email sent to ${user.first_name}:${info.response}');
                }
            });
        });
    }
    catch(error){
        console.error("Error in cron job",error);
    }
});