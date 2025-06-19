const multer = require('multer');
const path = require('path');
const {v4:uuidv4} = require('uuid');
const storage = multer.diskStorage({
    destination:(req,file,cd) =>{
        cd(null,'uploads/'); // folder to save the img
    },
    filename:(req,file,cd)=>{
        if(!file || !file.originalname){
            return cd(new Error("No file provided"))
        }
        const ext = path.extname(file.originalname);
        const filename= `${uuidv4()}${ext}`;//unique filename
        cd(null,filename);
    }
});
const upload = multer({storage});

module.exports = upload;