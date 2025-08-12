const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    const url = process.env.MONGO_URI ;
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch(err){
        console.error('MongoDB connection Error', err);
        process.exit(1);
    }
};

module.exports = { connectDB, mongoose};