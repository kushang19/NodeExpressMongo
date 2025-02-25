import mongoose  from "mongoose";

const connectDB = async () => {
  try {
    const dbURI =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_PROD
        : process.env.MONGO_URI_DEV;

    await mongoose.connect(dbURI);
    console.log("MongoDB Connected!!...");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

export default connectDB;

