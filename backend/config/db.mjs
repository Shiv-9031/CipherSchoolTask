import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`connected to database ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in MongoDb ${error}`);
  }
};

export default connectDB;
