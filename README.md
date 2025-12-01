# 🏨 API Hotel Management – Hệ thống Quản lý Khách sạn - CRUD

Dự án Backend cung cấp RESTful API để quản lý các hoạt động trong khách sạn như nhân viên, khách hàng, phòng, đặt phòng và hóa đơn. Dự án được xây dựng bằng **Node.js**, **Express.js**, **MongoDB (Mongoose)** theo kiến trúc **MVC**.

---

## 🚀 Công nghệ sử dụng

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **Nodemon**
- **dotenv**
- **Architecture: MVC (Model-View-Controller)**

---

## ✨ Chức năng chính

### 🔐 Admin

- Đăng ký Admin
- Đăng nhập hệ thống

### 👨‍💼 Employee (Nhân viên)

- Thêm nhân viên
- Sửa nhân viên
- Xóa nhân viên
- Xem danh sách nhân viên

### 🏨 Room (Phòng)

- CRUD thông tin phòng
- Theo dõi trạng thái phòng _(Trống / Đang thuê)_

### 📅 Booking (Đặt phòng) – Logic nâng cao

- Tự động kiểm tra trạng thái phòng trước khi đặt
- Tự động tạo khách hàng nếu chưa có
- Khi đặt phòng → phòng `isAvailable = false`
- Khi hủy phòng → phòng `isAvailable = true`

### 💵 Bill (Hóa đơn)

- Tạo hóa đơn
- Xem danh sách hóa đơn
- Xem chi tiết hóa đơn
- Xóa hóa đơn

---

## 🛠️ Cách cài đặt (Installation)

### 1️⃣ Clone dự án

```bash
git clone https://github.com/your-username/api-hotel.git
cd api-hotel
```

### 3️⃣ Tạo file .env ở thư mục gốc

```bash
PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/hotel_db
```

### 4️⃣ Chạy dự án

```bash
npm start
```

### Server chạy tại: 👉 http://localhost:8000

# 📚 API Documentation

### Admin Authentication

| Method | Endpoint            | Mô tả         |
| ------ | ------------------- | ------------- |
| POST   | /api/admin/register | Đăng ký Admin |
| POST   | /api/admin/login    | Đăng nhập     |

### Employee (Nhân viên)

| Method | Endpoint          | Mô tả               |
| ------ | ----------------- | ------------------- |
| POST   | /api/employee     | Tạo nhân viên       |
| GET    | /api/employee     | Danh sách nhân viên |
| GET    | /api/employee/:id | Chi tiết nhân viên  |
| PUT    | /api/employee/:id | Cập nhật nhân viên  |
| DELETE | /api/employee/:id | Xóa nhân viên       |

### Booking (Đặt phòng)

| Method | Endpoint         | Mô tả                         |
| ------ | ---------------- | ----------------------------- |
| POST   | /api/booking     | Đặt phòng mới                 |
| GET    | /api/booking     | Danh sách booking             |
| GET    | /api/booking/:id | Chi tiết booking              |
| PUT    | /api/booking/:id | Cập nhật booking              |
| DELETE | /api/booking/:id | Hủy booking (trả phòng trống) |

### Bill (Hóa đơn)

| Method | Endpoint      | Mô tả             |
| ------ | ------------- | ----------------- |
| POST   | /api/bill     | Tạo hóa đơn       |
| GET    | /api/bill     | Danh sách hóa đơn |
| GET    | /api/bill/:id | Chi tiết hóa đơn  |
| DELETE | /api/bill/:id | Xóa hóa đơn       |
