import React from 'react';
import * as LucideIcons from 'lucide-react';
import { StatCard as StatCardType } from '../../types';
import { formatChange, getChangeColor } from '../../utils/helpers';

interface StatCardProps {
  data: StatCardType;
}

const StatCard: React.FC<StatCardProps> = ({ data }) => {
  const { title, value, icon, change, changeType } = data;
  
  // Dynamically get the icon component
  const IconComponent = LucideIcons[icon as keyof typeof LucideIcons] || LucideIcons.Package;
  
  return (
    <div className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          
          <div className={`mt-2 flex items-center ${getChangeColor(changeType)}`}>
            {changeType === 'positive' ? (
              <LucideIcons.TrendingUp size={16} className="mr-1" />
            ) : changeType === 'negative' ? (
              <LucideIcons.TrendingDown size={16} className="mr-1" />
            ) : (
              <LucideIcons.Minus size={16} className="mr-1" />
            )}
            <span className="text-sm font-medium">{formatChange(change)}</span>
          </div>
        </div>
        
        <div className="p-3 bg-primary-100 rounded-lg">
          <IconComponent size={24} className="text-primary-600" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;