import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userModel from './models/userModel.js';

dotenv.config();
const MONGO = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGO;
if (!MONGO) {
  console.error('No MONGO_URI found in env. Please set MONGO_URI or MONGODB_URI');
  process.exit(1);
}

const email = process.argv[2];
if (!email) {
  console.error('Usage: node promoteAdmin.js <email>');
  process.exit(1);
}

const run = async () => {
  try {
    await mongoose.connect(MONGO);
    const user = await userModel.findOne({ email });
    if (!user) {
      console.error('User not found:', email);
      process.exit(1);
    }
    user.isAdmin = true;
    await user.save();
    console.log('Promoted to admin:', email);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
