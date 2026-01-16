import Order from "../models/userModel.js";

// Tạo đơn hàng mới
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const newOrder = new Order({
      userId,
      items,
      amount,
      address
    });

    await newOrder.save();
    res.status(201).json({ success: true, message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Lấy đơn hàng của user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Lấy tất cả đơn hàng (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("userId", "name email").sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};