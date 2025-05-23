import { Product, ChartData, StatCard } from "../types";
import { formatCurrency } from "../utils/helpers";

// Generate random dates within a range
const randomDate = (start: Date, end: Date): string => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString();
};

// Generate random stock history for products
export const generateStockHistory = (
  count: number
): {
  date: string;
  action: "added" | "removed" | "returned";
  quantity: number;
  note: string;
}[] => {
  const actions: ("added" | "removed" | "returned")[] = [
    "added",
    "removed",
    "returned",
  ];
  const history = [];

  for (let i = 0; i < count; i++) {
    const date = randomDate(new Date(2024, 0, 1), new Date());
    const action = actions[Math.floor(Math.random() * actions.length)];
    const quantity = Math.floor(Math.random() * 20) + 1;
    const notes = [
      "Regular inventory update",
      "Seasonal restock",
      "Customer return",
      "Damaged goods",
      "Quality check adjustment",
      "Expiry date removal",
      "Bulk order fulfillment",
    ];
    const note = notes[Math.floor(Math.random() * notes.length)];

    history.push({
      date,
      action,
      quantity,
      note,
    });
  }

  return history.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

// Generate random chart data for a product
export const generateProductChartData = (): ChartData => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return {
    dates: months,
    inStock: months.map(() => Math.floor(Math.random() * 100) + 20),
    soldOut: months.map(() => Math.floor(Math.random() * 50)),
  };
};

// Mock product data
export const products: Product[] = [
  {
    id: "1",
    name: "Maggi",
    type: "Food",
    quantity: 29,
    expiryDate: "2025-06-20",
    mfgDate: "2025-05-04",
    rackNo: "A-12",
    roomTemp: 30,
    batchNo: "2245",
    createdAt: "2025-05-22T16:10:32.455Z",
    productImage:
      "https://images.pexels.com/photos/13835132/pexels-photo-13835132.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 2.49,
    supplier: "Nestle Inc.",
    status: "In Stock",
    history: generateStockHistory(8),
    stockHistory: generateProductChartData(),
  },
  {
    id: "2",
    name: "Oreo Cookies",
    type: "Food",
    quantity: 45,
    expiryDate: "2025-09-15",
    mfgDate: "2025-04-12",
    rackNo: "A-13",
    roomTemp: 28,
    batchNo: "3356",
    createdAt: "2025-04-13T11:22:43.123Z",
    productImage:
      "https://images.pexels.com/photos/3192/black-and-white-cookies-cream-oreo.jpg?auto=compress&cs=tinysrgb&w=600",
    price: 3.99,
    supplier: "Mondelez Foods",
    status: "In Stock",
    history: generateStockHistory(5),
    stockHistory: generateProductChartData(),
  },
  {
    id: "3",
    name: "Coca Cola",
    type: "Beverage",
    quantity: 8,
    expiryDate: "2025-07-30",
    mfgDate: "2025-03-15",
    rackNo: "B-05",
    roomTemp: 25,
    batchNo: "9987",
    createdAt: "2025-03-16T09:45:12.345Z",
    productImage:
      "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 1.99,
    supplier: "Coca-Cola Company",
    status: "Low Stock",
    history: generateStockHistory(10),
    stockHistory: generateProductChartData(),
  },
  {
    id: "4",
    name: "Dove Soap",
    type: "Personal Care",
    quantity: 0,
    expiryDate: "2026-02-10",
    mfgDate: "2025-02-20",
    rackNo: "C-08",
    roomTemp: 26,
    batchNo: "4532",
    createdAt: "2025-02-21T14:30:55.789Z",
    productImage:
      "https://images.pexels.com/photos/5217936/pexels-photo-5217936.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 4.49,
    supplier: "Unilever Co.",
    status: "Out of Stock",
    history: generateStockHistory(6),
    stockHistory: generateProductChartData(),
  },
  {
    id: "5",
    name: "Colgate Toothpaste",
    type: "Personal Care",
    quantity: 60,
    expiryDate: "2026-05-15",
    mfgDate: "2025-01-10",
    rackNo: "C-09",
    roomTemp: 27,
    batchNo: "7789",
    createdAt: "2025-01-12T10:15:20.456Z",
    productImage:
      "https://images.pexels.com/photos/6202951/pexels-photo-6202951.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 3.29,
    supplier: "Colgate-Palmolive",
    status: "In Stock",
    history: generateStockHistory(4),
    stockHistory: generateProductChartData(),
  },
  {
    id: "6",
    name: "Nescafe Coffee",
    type: "Beverage",
    quantity: 15,
    expiryDate: "2025-12-25",
    mfgDate: "2025-03-01",
    rackNo: "B-07",
    roomTemp: 29,
    batchNo: "3312",
    createdAt: "2025-03-05T08:40:12.789Z",
    productImage:
      "https://images.pexels.com/photos/4829093/pexels-photo-4829093.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 6.99,
    supplier: "Nestle Inc.",
    status: "In Stock",
    history: generateStockHistory(7),
    stockHistory: generateProductChartData(),
  },
  {
    id: "7",
    name: "Lays Chips",
    type: "Food",
    quantity: 4,
    expiryDate: "2025-06-30",
    mfgDate: "2025-04-05",
    rackNo: "A-15",
    roomTemp: 30,
    batchNo: "5543",
    createdAt: "2025-04-06T15:22:33.123Z",
    productImage:
      "https://images.pexels.com/photos/544127/pexels-photo-544127.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 2.79,
    supplier: "PepsiCo",
    status: "Low Stock",
    history: generateStockHistory(9),
    stockHistory: generateProductChartData(),
  },
  {
    id: "8",
    name: "Tide Detergent",
    type: "Household",
    quantity: 25,
    expiryDate: "2026-01-15",
    mfgDate: "2025-02-10",
    rackNo: "D-03",
    roomTemp: 28,
    batchNo: "8876",
    createdAt: "2025-02-12T09:10:45.456Z",
    productImage:
      "https://images.pexels.com/photos/4239012/pexels-photo-4239012.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 8.99,
    supplier: "Procter & Gamble",
    status: "In Stock",
    history: generateStockHistory(5),
    stockHistory: generateProductChartData(),
  },
];

// Mock chart data
export const inventoryChartData: ChartData = {
  dates: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  inStock: [120, 132, 101, 134, 90, 230, 210, 180, 190, 220, 240, 210],
  soldOut: [20, 40, 50, 60, 70, 40, 50, 60, 90, 60, 70, 40],
};

// Mock stats card data
export const statCardsData: StatCard[] = [
  {
    title: "Total Products",
    value: "186",
    icon: "Package",
    change: 12.5,
    changeType: "positive",
  },
  {
    title: "Low Stock Items",
    value: "24",
    icon: "AlertTriangle",
    change: 8.2,
    changeType: "negative",
  },
  {
    title: "Revenue (Monthly)",
    value: formatCurrency(28650),
    icon: "DollarSign",
    change: 5.3,
    changeType: "positive",
  },
  {
    title: "Expired Products",
    value: "0",
    icon: "Trash2",
    change: 2.1,
    changeType: "positive",
  },
];

// Generate product category distribution data
export const categoryDistribution = [
  { value: 45, name: "Food" },
  { value: 25, name: "Beverage" },
  { value: 15, name: "Personal Care" },
  { value: 10, name: "Household" },
  { value: 5, name: "Other" },
];

// Generate recent activity data
export const recentActivity = [
  {
    id: 1,
    action: "Stock Added",
    product: "Maggi",
    quantity: 50,
    timestamp: "2 hours ago",
    user: "John Doe",
  },
  {
    id: 2,
    action: "Stock Removed",
    product: "Coca Cola",
    quantity: 24,
    timestamp: "5 hours ago",
    user: "Jane Smith",
  },
  {
    id: 3,
    action: "Product Updated",
    product: "Tide Detergent",
    quantity: 0,
    timestamp: "1 day ago",
    user: "Mike Johnson",
  },
  {
    id: 4,
    action: "Stock Alert",
    product: "Lays Chips",
    quantity: 5,
    timestamp: "1 day ago",
    user: "System",
  },
  {
    id: 5,
    action: "Product Added",
    product: "Nutella",
    quantity: 30,
    timestamp: "2 days ago",
    user: "Sarah Williams",
  },
];
