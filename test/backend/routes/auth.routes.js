import express from 'express';
import user from '../models/user.model.js';
import formidable from 'formidable';
const router = express.Router();
import passport from 'passport';
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from './generateToken.js';



router.post('/login', async (req, res) => {
        try {
            const is_user = await user.findOne({ email: req.body.email });
            generateTokenAndSetCookie(is_user,res)
           
        } catch (error) {
            res.json({'Error in auth.routes.js ':error});
        }
    });

router.get('/login', (req, res) => {
    res.status(400).send({ error: "Something went wrong !!!" });
})

router.get('/log-out', (req, res) => {
    try {
        res.cookie('jwt','',{maxAge: 0})
        res.status(200).json({message: '*******Youre logged out *******'})
    } catch (error) {
        console.log('error in auth.roiutes.js==>',error)
        res.status(500).json({"error in auth.roiutes.js==>" :error});
    }
})


router.post("/signup", async (req, res) => {
    var form = formidable({
        allowEmptyFiles: true // Allow empty files
    })
    let fields;
    let files;
    try {
        [fields, files] = await form.parse(req);
        
    } catch (err) {
        console.log(err)
    }
    const hexaPass = await bcrypt.hash(fields.password[0], 10);

    console.log(hexaPass)
    let new_user = new user({
        name: fields.name[0],
        email: fields.email[0],
        password: hexaPass,
        phone_no: fields.phone_no[0],
        username: fields.username[0],
        gender: fields.gender[0],
        dob: fields.dob[0],
        country: fields.country[0],
        type: fields.type[0]
    })
    new_user.save().then((result) => { res.send("Registration successful") }).catch((err) => res.send(err.message));
})

export default router;