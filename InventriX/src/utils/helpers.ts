// Format currency for display
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

// Calculate status based on quantity
export const calculateStatus = (
  quantity: number
): "In Stock" | "Low Stock" | "Out of Stock" => {
  if (quantity <= 0) return "Out of Stock";
  if (quantity <= 10) return "Low Stock";
  return "In Stock";
};

// Get status color
export const getStatusColor = (status: string): string => {
  switch (status) {
    case "In Stock":
      return "bg-green-100 text-green-800";
    case "Low Stock":
      return "bg-yellow-100 text-yellow-800";
    case "Out of Stock":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Format change indicator
export const formatChange = (change: number): string => {
  const sign = change > 0 ? "+" : "";
  return `${sign}${change}%`;
};

// Get change type color
export const getChangeColor = (
  type: "positive" | "negative" | "neutral"
): string => {
  switch (type) {
    case "positive":
      return "text-green-500";
    case "negative":
      return "text-red-500";
    case "neutral":
    default:
      return "text-gray-500";
  }
};

// Truncate text
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};
