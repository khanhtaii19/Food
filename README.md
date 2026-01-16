# Food Delivery App - Backend

## Cài đặt

### 1. Cài đặt dependencies
```bash
cd backend
npm install
```

### 2. Cài đặt nodemon (nếu chưa có)
```bash
npm install -D nodemon
```

### 3. Cấu hình môi trường
Tạo file `.env` trong thư mục backend:
```
MONGO_URI=mongodb://127.0.0.1:27017/foodapp
PORT=5000
JWT_SECRET=your_secret_key_change_this
```

### 4. Chạy MongoDB
Đảm bảo MongoDB đang chạy trên máy:
```bash
# Windows
mongod

# Mac/Linux
sudo service mongod start
```

### 5. Tạo dữ liệu mẫu (tùy chọn)
```bash
node seedData.js
```

### 6. Khởi động server
```bash
# Development mode (auto-reload)
npm run dev

# Production mode
npm start
```

Server sẽ chạy tại: `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký tài khoản
- `POST /api/auth/login` - Đăng nhập

### Foods
- `GET /api/foods` - Lấy danh sách món ăn
- `POST /api/foods` - Thêm món ăn mới

### Orders (Cần authentication)
- `POST /api/orders/place` - Đặt hàng
- `GET /api/orders/user` - Lấy đơn hàng của user
- `GET /api/orders/all` - Lấy tất cả đơn hàng (admin)
- `POST /api/orders/status` - Cập nhật trạng thái đơn hàng

## Cấu trúc thư mục
```
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── foodController.js
│   └── orderController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── User.js
│   ├── Food.js
│   └── Order.js
├── routes/
│   ├── authRoutes.js
│   ├── foodRoutes.js
│   └── orderRoutes.js
├── .env
├── server.js
├── seedData.js
└── package.json
```

## Testing với Postman

### 1. Đăng ký
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456"
}
```

### 2. Đăng nhập
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "test@example.com",
  "password": "123456"
}
```

### 3. Lấy danh sách món ăn
```
GET http://localhost:5000/api/foods
```

### 4. Đặt hàng (cần token)
```
POST http://localhost:5000/api/orders/place
Headers:
Authorization: Bearer YOUR_TOKEN_HERE
Body (JSON):
{
  "items": [
    {
      "foodId": "FOOD_ID_HERE",
      "name": "Greek Salad",
      "price": 12,
      "quantity": 2
    }
  ],
  "amount": 24,
  "address": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipcode": "10001",
    "country": "USA",
    "phone": "1234567890"
  }
}
```

## Lưu ý
- Đảm bảo MongoDB đang chạy trước khi start server
- Thay đổi `JWT_SECRET` trong file `.env` cho production
- Sử dụng `npm run dev` khi phát triển để tự động reload