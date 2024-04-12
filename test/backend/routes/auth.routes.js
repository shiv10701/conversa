import express from 'express';
import user from '../models/user.model.js';
import formidable from 'formidable';

const router=express.Router();

router.get("/login",(req,res)=>{
    res.send("Hello this is login")
})

router.post("/signup",async (req,res)=>{
    var form=formidable({
        
    })
    let fields;
    let files;

    try {
        [fields, files] = await form.parse(req);
    } catch (err) {
        console.log(err)
    }
    console.log(fields,files)
    let new_user=new user({
        name:fields.name[0],
        email:fields.email[0],
        password:fields.password[0],
        phone_no:fields.phone_no[0],
        username:fields.username[0],
        gender:fields.gender[0],
        dob:fields.dob[0],
        country:fields.country[0],
        type:fields.type[0]
    })
    new_user.save().then((result)=>{res.send("Hello this is sign up")}).catch((err)=>res.send(err.message));
    //res.send("Hello this is sign up")
})

export default router;