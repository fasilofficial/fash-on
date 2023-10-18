const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_LOCAL_URI);
    console.log(`Database running on: mongodb://${mongoose.connection.host}/${mongoose.connection.name}`);

    // await mongoose.connect(process.env.MONGODB_CLOUD_URI);
    // console.log(`Database running on: mongodb+srv://${mongoose.connection.host}/${mongoose.connection.name}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
