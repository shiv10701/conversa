import mongoose from 'mongoose';

function mydb(){

    mongoose.connect("")

// iNoteBook
.then(()=>{
    console.log("connection established")
})
.catch((err)=>{
    console.log("No connection")
})

}

export default mydb;