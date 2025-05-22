// server.js
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "hgabhishek5@gmail.com",
    pass: "gzjk wyqk uclx ulgt",
  },
});

app.post("/send-alert-email", async (req, res) => {
  const { to, lowStockProducts } = req.body;

  if (!Array.isArray(lowStockProducts) || lowStockProducts.length === 0) {
    return res.status(400).send("No products to alert on");
  }

  // Build an HTML table of product details
  const rows = lowStockProducts
    .map((p) => {
      const percent =
        p.percentInStock != null
          ? `${p.percentInStock}%`
          : p.stock != null && p.capacity
          ? `${Math.round((p.stock / p.capacity) * 100)}%`
          : "N/A";

      return `
      <tr>
        <td style="padding:8px;border:1px solid #ddd;">${p.name}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:center;">${percent}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:center;">${
          p.stock ?? "—"
        }</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:center;">${
          p.capacity ?? "—"
        }</td>
      </tr>
    `;
    })
    .join("");

  const html = `
    <h3>The following items are below 20% stock:</h3>
    <table style="border-collapse:collapse;">
      <thead>
        <tr>
          <th style="padding:8px;border:1px solid #ddd;">Product</th>
          <th style="padding:8px;border:1px solid #ddd;">In-Stock %</th>
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

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
