import express from "express";
import Food from "../models/Food.js";

const router = express.Router();

// Lấy tất cả món ăn
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm món ăn mới (test thử bằng Postman)
router.post("/", async (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    const newFood = new Food({ name, description, price, image });
    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
