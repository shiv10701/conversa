import mydb from "./db.js"
import express from 'express'
const app = express()
import bodyParser from "body-parser";
import cors from "cors";
import authRoute from './routes/auth.routes.js';
import msgRoute from './routes/is_logged_in.routes.js';
// ---------Passport---------
import passport from 'passport';
import expressSession from 'express-session';
import { initializingPassport, isAuthenticated } from './routes/passportConfig.js';
// ---------Flash---------
import flash from "express-flash";
// ---------Passport---------
app.use(expressSession({  //this  MV(middleweare) should be before below  two
  secret: "secret", resave: false, saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
initializingPassport(passport);//PASSPORT=this function working as middleware check it out

// ---------Parsers----------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(flash());
mydb();
const port = 5000;

// Available Routes 

app.get('/', (req, res) => {
  res.send('Hello World !!!!!!');
});

app.use("/api/auth", authRoute)
app.use("/api/is-login", msgRoute)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
