import mongoose from 'mongoose';




const connectDB = async(req , res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('connected to db')
    } catch (e) {
        console.log('Error connecting to database:', e);
    }
}

export default connectDB;