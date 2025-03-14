//connects to mongoDB database
import mongoose from "mongoose";

async function connectDB() {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Connected to Database ${connect.connection.host}`);
  } catch (err) {
    console.log(`Error. Failed to connect to MongoDB: ${err.message}`);
    process.exit(1);
  }
}

export default connectDB;
