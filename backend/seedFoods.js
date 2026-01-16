import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Food from './models/foodModel.js';

dotenv.config();

const MONGO = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGO;
if (!MONGO) {
  console.error('No MONGO_URI found in env. Please set MONGO_URI or MONGODB_URI');
  process.exit(1);
}

const sampleFoods = [
  {
    name: 'Margherita Pizza',
    description: 'Classic cheese & tomato pizza',
    price: 8.99,
    image: 'https://via.placeholder.com/300?text=Margherita',
    category: 'Pizza'
  },
  {
    name: 'Chicken Burger',
    description: 'Juicy chicken patty with lettuce and mayo',
    price: 6.5,
    image: 'https://via.placeholder.com/300?text=Chicken+Burger',
    category: 'Burger'
  },
  {
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with Caesar dressing',
    price: 5.25,
    image: 'https://via.placeholder.com/300?text=Caesar+Salad',
    category: 'Salad'
  }
];

const run = async () => {
  try {
    await mongoose.connect(MONGO);
    console.log('Connected to DB');
    await Food.deleteMany({});
    const created = await Food.insertMany(sampleFoods);
    console.log('Inserted foods:', created.length);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
