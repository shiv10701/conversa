import mongoose from 'mongoose';

function mydb(){
    // const mongoose_url='mongodb+srv://conversaIsUserName:conversa%40123@conversa.bej8g03.mongodb.net/conversa';
    const mongoose_url='mongodb+srv://conversa:conversa@cluster0.rm1iz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

    mongoose.connect(mongoose_url)
.then(()=>{
    console.log("connection established")
})
.catch((err)=>{
    console.log("No connection "+err.message)
})
}

export default mydb;