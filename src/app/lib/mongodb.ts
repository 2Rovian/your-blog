import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI as string;

if(!MONGODB_URI){
    throw new Error("MONGODB_URI is not defined in env")
}

export const connectDB = async () => {
    if(mongoose.connection.readyState >= 1){
        return;
    }

    await mongoose.connect(MONGODB_URI);
}