import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected to database');
    } catch (err) {
        console.error('Error connecting to database: ', err);
    }
}