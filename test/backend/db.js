import mongoose from 'mongoose';

function mydb(){
    const mongoose_url='mongodb+srv://conversaIsUserName:conversa%40123@conversa.bej8g03.mongodb.net/conversa';

    mongoose.connect(mongoose_url)
.then(()=>{
    console.log("connection established")
})
.catch((err)=>{
    console.log("No connection "+err.message)
})
}

export default mydb;