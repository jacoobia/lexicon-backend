import mongoose from 'mongoose';

const databaseAddress = process.env.DATABASE_ADDRESS;

export const Setup = async(): Promise<void> => {
    if(databaseAddress) {
        await mongoose.connect(databaseAddress!);
        console.log('Connected');
    } else {
        console.log('Database address not defined, closing app.');
        process.exit(1);
    }
}