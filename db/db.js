const mongoose = require('mongoose');

const db = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Mongodb connected success');
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`);
  }
};

module.exports = { db };
