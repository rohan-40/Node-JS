const mongoose = require('mongoose');
// const mongoURL = 'mongodb://localhost:27017/hotels';
// const mongoURL = 'mongodb+srv://rohan740:rohan740@cluster0.l5vknx4.mongodb.net/'

require('dotenv').config();
const mongoURL = process.env.MONGOdb_URL;

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connected to MongoDB Server")
})

db.on('error', (err) => {
    console.log("MongoDB Connection error: ",err)
})

db.on('disconnected', () => {
    console.log("Disconnected to MongoDB Server");
})

module.exports = db;