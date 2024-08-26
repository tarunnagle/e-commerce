import mongoose from "mongoose";

const connectDB = async () => {
    try {
        constconn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`);
        ProcessingInstruction.exit(1);

    }
};

export default connectDB;