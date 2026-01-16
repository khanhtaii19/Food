import mongoose from "mongoose";
import dotenv from "dotenv";
import Food from "./models/foodModel.js";
import connectDB from "./config/db.js";

dotenv.config();

const sampleFoods = [
  {
    name: "Greek Salad",
    description: "Fresh vegetables with feta cheese and olive oil",
    price: 12,
    image: "/food_1.png",
    category: "Salad"
  },
  {
    name: "Veg Salad",
    description: "Healthy mix of fresh vegetables",
    price: 10,
    image: "/food_2.png",
    category: "Salad"
  },
  {
    name: "Clover Salad",
    description: "Nutritious salad with clover sprouts",
    price: 11,
    image: "/food_3.png",
    category: "Salad"
  },
  {
    name: "Chicken Salad",
    description: "Grilled chicken with fresh greens",
    price: 14,
    image: "/food_4.png",
    category: "Salad"
  },
  {
    name: "Lasagna Rolls",
    description: "Delicious pasta rolls with cheese",
    price: 15,
    image: "/food_5.png",
    category: "Rolls"
  },
  {
    name: "Peri Peri Rolls",
    description: "Spicy peri peri chicken rolls",
    price: 13,
    image: "/food_6.png",
    category: "Rolls"
  },
  {
    name: "Chicken Rolls",
    description: "Tender chicken wrapped in soft bread",
    price: 12,
    image: "/food_7.png",
    category: "Rolls"
  },
  {
    name: "Veg Rolls",
    description: "Fresh vegetable rolls",
    price: 10,
    image: "/food_8.png",
    category: "Rolls"
  },
  {
    name: "Ripple Ice Cream",
    description: "Creamy ripple ice cream",
    price: 8,
    image: "/food_9.png",
    category: "Deserts"
  },
  {
    name: "Fruit Ice Cream",
    description: "Refreshing fruit flavored ice cream",
    price: 9,
    image: "/food_10.png",
    category: "Deserts"
  },
  {
    name: "Jar Ice Cream",
    description: "Premium ice cream in a jar",
    price: 10,
    image: "/food_11.png",
    category: "Deserts"
  },
  {
    name: "Vanilla Ice Cream",
    description: "Classic vanilla ice cream",
    price: 7,
    image: "/food_12.png",
    category: "Deserts"
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Xóa dữ liệu cũ
    await Food.deleteMany({});
    console.log("Đã xóa dữ liệu cũ");
    
    // Thêm dữ liệu mẫu
    await Food.insertMany(sampleFoods);
    console.log("✅ Đã thêm dữ liệu mẫu thành công!");
    
    process.exit();
  } catch (error) {
    console.error("❌ Lỗi:", error);
    process.exit(1);
  }
};

seedDatabase();