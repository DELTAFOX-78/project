// server.js
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

dotenv.config();

// Fix: Verify Product model import
const Product = require("./db/products");

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.info("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error: " + err);
    setTimeout(connectDB, 5000); // Retry after 5 seconds
  }
};

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "hgabhishek5@gmail.com",
    pass: "gzjk wyqk uclx ulgt",
  },
});

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../InventriX/public/images");
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/api/products", (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      console.error("Error fetching products:", err);
      res.status(500).json({ error: "Failed to fetch products" });
    });
});

app.post("/api/addProduct", async (req, res) => {
  try {
    const productData = req.body;

    // Convert numeric strings to numbers
    ["quantity", "roomTemp"].forEach((field) => {
      if (productData[field]) {
        productData[field] = Number(productData[field]);
      }
    });

    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      error: "Failed to add product",
      details: error.message,
    });
  }
});

app.post("/send-alert-email", async (req, res) => {
  const { to, lowStockProducts } = req.body;

  if (!Array.isArray(lowStockProducts) || lowStockProducts.length === 0) {
    return res.status(400).send("No products to alert on");
  }

  // Generate random stats
  const randomStats = {
    totalProducts: Math.floor(Math.random() * 500) + 100,
    avgStockLevel: Math.floor(Math.random() * 60) + 40 + "%",
    lastRestockDays: Math.floor(Math.random() * 7) + 1,
    totalCapacity: Math.floor(Math.random() * 10000) + 5000 + " units",
  };

  // Build an HTML table of product details
  const rows = lowStockProducts
    .map((p) => {
      return `
      <tr>
        <td style="padding:8px;border:1px solid #ddd;">${p.name}</td>
       
        <td style="padding:8px;border:1px solid #ddd;text-align:center;">${
          p.quantity ?? "—"
        }</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:center;">${
          p.capacity ?? "—"
        }</td>
      </tr>
    `;
    })
    .join("");

  const html = `
    <h3>Warehouse Status Overview:</h3>
    <div style="margin-bottom: 20px; padding: 10px; background-color: #f5f5f5; border-radius: 5px;">
      <p><strong>Total Products in Warehouse:</strong> ${randomStats.totalProducts}</p>
      <p><strong>Average Stock Level:</strong> ${randomStats.avgStockLevel}</p>
      <p><strong>Days Since Last Restock:</strong> ${randomStats.lastRestockDays}</p>
      <p><strong>Total Warehouse Capacity:</strong> ${randomStats.totalCapacity}</p>
    </div>
    <h3>The following items are below 20% stock:</h3>
    <table style="border-collapse:collapse;">
      <thead>
        <tr>
          <th style="padding:8px;border:1px solid #ddd;">Product</th>
          <th style="padding:8px;border:1px solid #ddd;">Stock</th>
          <th style="padding:8px;border:1px solid #ddd;">Capacity</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    <p>Please restock these items at the earliest convenience.</p>
  `;

  try {
    await transporter.sendMail({
      from: "SmartWarehouse <hgabhishek5@gmail.com>",
      to,
      subject: "⚠️ Low Stock Alert",
      html,
    });
    res.status(200).send("Email sent");
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send("Email sending failed");
  }
});

// Add this new route
app.post("/api/upload-image", upload.single("image"), (req, res) => {
  try {
    res.json({ success: true, filename: req.file.filename });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// Serve static files from public directory
app.use(
  "/images",
  express.static(path.join(__dirname, "../InventriX/public/images"))
);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
