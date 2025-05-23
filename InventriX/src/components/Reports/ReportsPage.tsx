import React from 'react';
import { recentActivity } from '../../data/mockData';
import RecentActivity from '../Dashboard/RecentActivity';
import InventoryLineChart from '../Charts/InventoryLineChart';
import { inventoryChartData } from '../../data/mockData';

const ReportsPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Reports & Analytics</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <InventoryLineChart data={inventoryChartData} />
          </div>
          <div className="lg:col-span-1">
            <RecentActivity activities={recentActivity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;