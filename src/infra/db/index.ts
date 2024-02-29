import mongoose from 'mongoose';
import config from '../config';

const connectionString = config.DB_URL;

export const connectDb = async () => {
  try {
    mongoose.connect(connectionString, {
      dbName: 'ecommerce',
    });

    console.log('DB is connected');
  } catch (e) {
    console.log('Could not connect to the database');
  }
};
