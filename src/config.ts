import mongoose from 'mongoose';

const databaseAddress = process.env.DATABASE_ADDRESS;
const port = process.env.PORT || 8100;

const Setup = async(): Promise<void> => {
    if(databaseAddress) {
        await mongoose.connect(databaseAddress!);
        console.log(`Connected to database, app listening on port ${port}.`);
    } else {
        console.log('Database address not defined, closing app.');
        process.exit(1);
    }
}

export default Setup;