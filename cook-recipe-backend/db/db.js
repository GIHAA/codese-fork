import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config();

const dbUri = process.env.ATLAS_URI;

if (!dbUri) {
    console.error("Database URI is missing. Check your .env file.");
    process.exit(1);  // Exit the process if the URI is not found
}

mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});
