import mongoose from 'mongoose'

// mongodb://localhost:27017/mean// const connectionString = `mongodb://${process.env.MONGO_DB_NAME}\
//     :${process.env.MONGO_DB_SECRET}@${process.env.MONGO_DB_HOST}\
//     :${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}`;

if (process.env.NODE_ENV !== "test") {
  mongoose.connect('mongodb://localhost:27017/hapi');

  const dbMongo = mongoose.connection

  dbMongo.on('error', console.error.bind(console, 'mongodb connection error : '));

  dbMongo.once('open', () => {
    console.log('mongoose is connected to mongod and ready to be used!');
  });
}
module.exports = mongoose
