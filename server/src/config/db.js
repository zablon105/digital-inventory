import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`⚠️ Warning: MongoDB connection failed (${error.message}).`);
    console.error(`Running backend in database-less mode. Make sure MongoDB is active at ${process.env.MONGO_URI}`);
  }
};

export default connectDB;
