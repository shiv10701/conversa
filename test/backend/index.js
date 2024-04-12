import mydb from "./db.js"
import express from 'express'
const app = express()
import bodyParser from "body-parser";
import cors from "cors";
import authRoute from './routes/auth.routes.js'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

mydb();
const port = 5000

// Available Routes

app.get('/', (req, res) => {
  res.send('Hello World!!!!!!!!!!!')
})

app.use("/api/auth",authRoute)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
