import express from 'express';
import user from '../models/user.model.js';
import formidable from 'formidable';
const router = express.Router();
import passport from 'passport';
import bcrypt from 'bcrypt';

let sessionData;

router.post('/login', passport.authenticate('local', { failureRedirect: '/api/auth/login' }),
    async (req, res) => {
        sessionData = req.user             //session stored
        try {
            if (req.isAuthenticated()) {
                res.send("You're Logged In ")
            }
        } catch (error) {
            res.send(error);
        }
    });

router.get('/login', (req, res) => {
    console.log(messages.message); 
    res.status(400).send({ error: "Something went wrong !!!" });
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