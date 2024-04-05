import mongoose from 'mongoose';

function mydb(){

    mongoose.connect("mongodb+srv://bhoitepushpak6:PB%40Bhoite123@pushpakclusture.jwcvkdj.mongodb.net/iNoteBook")

// iNoteBook
.then(()=>{
    console.log("connection established")
})
.catch((err)=>{
    console.log("No connection")
})

}

export default mydb;