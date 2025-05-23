import React from 'react';
import { Package, TrendingDown, TrendingUp, AlertTriangle, Plus } from 'lucide-react';

interface ActivityItem {
  id: number;
  action: string;
  product: string;
  quantity: number;
  timestamp: string;
  user: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'Stock Added':
        return <Plus size={16} className="text-green-500" />;
      case 'Stock Removed':
        return <TrendingDown size={16} className="text-red-500" />;
      case 'Product Updated':
        return <Package size={16} className="text-blue-500" />;
      case 'Stock Alert':
        return <AlertTriangle size={16} className="text-yellow-500" />;
      case 'Product Added':
        return <TrendingUp size={16} className="text-green-500" />;
      default:
        return <Package size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-card h-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <button className="text-sm text-primary-600 font-medium hover:text-primary-700 transition-colors">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start">
            <div className="flex-shrink-0 p-2 rounded-full bg-gray-100">
              {getActivityIcon(activity.action)}
            </div>
            <div className="ml-3 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <span className="text-xs text-gray-500">{activity.timestamp}</span>
              </div>
              <p className="text-sm text-gray-500">
                {activity.quantity > 0 ? `${activity.quantity} units of ` : ''}{activity.product}
                {activity.user !== 'System' ? ` by ${activity.user}` : ''}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;