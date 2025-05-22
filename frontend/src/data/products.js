// src/data/products.js
export const products = [
  {
    id: 1,
    name: "Organic Apples",
    type: "Fruit",
    // list of variant names
    variants: ["Red Delicious", "Granny Smith", "Fuji"],

    // overall aggregate info
    overall: {
      category: "Produce",
      currentStock: 170,
      percentInStock: 85,
      salesPercent: 60,
      expiryDate: "2025-06-15",
      mfgDate: "2025-01-10",
      stacks: 5,
      roomTemp: 4,
      // time-series trend for all variants
      trend: [
        { date: "2025-05-01", purchased: 50, sold: 40 },
        { date: "2025-05-05", purchased: 80, sold: 65 },
        { date: "2025-05-10", purchased: 90, sold: 75 },
        { date: "2025-05-15", purchased: 60, sold: 55 },
        { date: "2025-05-20", purchased: 70, sold: 60 },
      ],
    },

    // per-variant info
    variantData: {
      "Red Delicious": {
        currentStock: 60,
        percentInStock: 75,
        salesPercent: 50,
        trend: [
          { date: "2025-05-01", purchased: 20, sold: 15 },
          { date: "2025-05-05", purchased: 30, sold: 25 },
          { date: "2025-05-10", purchased: 35, sold: 28 },
          { date: "2025-05-15", purchased: 25, sold: 20 },
          { date: "2025-05-20", purchased: 28, sold: 22 },
        ],
      },
      "Granny Smith": {
        currentStock: 55,
        percentInStock: 85,
        salesPercent: 60,
        trend: [
          { date: "2025-05-01", purchased: 20, sold: 15 },
          { date: "2025-05-05", purchased: 35, sold: 25 },
          { date: "2025-05-10", purchased: 40, sold: 30 },
          { date: "2025-05-15", purchased: 25, sold: 20 },
          { date: "2025-05-20", purchased: 30, sold: 28 },
        ],
      },
      Fuji: {
        currentStock: 55,
        percentInStock: 90,
        salesPercent: 70,
        trend: [
          { date: "2025-05-01", purchased: 10, sold: 5 },
          { date: "2025-05-05", purchased: 15, sold: 10 },
          { date: "2025-05-10", purchased: 15, sold: 12 },
          { date: "2025-05-15", purchased: 10, sold: 8 },
          { date: "2025-05-20", purchased: 12, sold: 10 },
        ],
      },
    },
  },
  // …other products
];
