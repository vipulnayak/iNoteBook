const mongoose = require('mongoose');
const dbHost = process.env.dburl;

const connectToMongo = async function connectToDatabase() {
  try {
    await mongoose.connect(dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}


module.exports = connectToMongo;