export interface Product {
  id: string;
  name: string;
  type: string;
  quantity: number;
  expiryDate: string;
  mfgDate: string;
  rackNo: string;
  roomTemp: number;
  batchNo: string;
  createdAt: string;
  productImage: string;
  price: number;
  supplier: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  history: StockHistory[];
  stockHistory: ChartData;
}

export interface StockHistory {
  date: string;
  action: 'added' | 'removed' | 'returned';
  quantity: number;
  note: string;
}

export interface ChartData {
  dates: string[];
  inStock: number[];
  soldOut: number[];
}

export interface StatCard {
  title: string;
  value: number | string;
  icon: string;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
}