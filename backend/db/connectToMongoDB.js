import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectToMongoDB=async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`MongoDB Connected..`);
    }
    catch(error){
        console.error(`Error: ${error}`);
    }
}


export default connectToMongoDB;