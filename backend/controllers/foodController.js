import Food from "../models/Food.js";

// Lấy danh sách món ăn
export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Thêm món ăn
export const createFood = async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.status(201).json(food);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
