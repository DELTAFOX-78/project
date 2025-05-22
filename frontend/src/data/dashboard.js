export const stats = [
  {
    id: 1,
    title: "Future Stock",
    value: "12,400",
    icon: "📦",
    bg: "bg-blue-100",
  },
  {
    id: 2,
    title: "Emergency Alerts",
    value: "3",
    icon: "🚨",
    bg: "bg-red-100",
  },
  {
    id: 3,
    title: "Purchase Trend",
    value: "↑ 8.5%",
    icon: "📈",
    bg: "bg-green-100",
  },
];

export const products = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: i % 2 === 0 ? "Perishable" : "Non-perishable",
  percentInStock: Math.floor(Math.random() * 100),
}));
