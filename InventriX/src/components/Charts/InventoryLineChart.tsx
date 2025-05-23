import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import { ChartData } from "../../types";
import {
  generateTimelineDates,
  generateRandomData,
} from "../../utils/chartHelpers";

interface InventoryLineChartProps {
  data: ChartData;
}

const InventoryLineChart: React.FC<InventoryLineChartProps> = ({
  data: initialData,
}) => {
  const [timeframe, setTimeframe] = useState<"year" | "month" | "week">("year");
  const [chartData, setChartData] = useState(initialData);

  const updateChartData = (period: "year" | "month" | "week") => {
    const dates = generateTimelineDates(period);
    const dataLength = dates.length;

    setChartData({
      dates,
      inStock: generateRandomData(dataLength, 50, 250),
      soldOut: generateRandomData(dataLength, 10, 100),
    });
  };

  const option = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderColor: "#e0e0e0",
      borderWidth: 1,
      textStyle: {
        color: "#333",
      },
      confine: true,
    },
    legend: {
      data: ["In Stock", "Sold Out"],
      bottom: 10,
      icon: "circle",
      itemWidth: 8,
      itemHeight: 8,
      textStyle: {
        color: "#666",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "15%",
      top: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: chartData?.dates,
      axisLine: {
        lineStyle: {
          color: "#e0e0e0",
        },
      },
      axisLabel: {
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        lineStyle: {
          color: "#f0f0f0",
        },
      },
      axisLabel: {
        color: "#666",
      },
    },
    series: [
      {
        name: "In Stock",
        type: "line",
        smooth: true,
        data: chartData?.inStock,
        symbol: "circle",
        symbolSize: 6,
        itemStyle: {
          color: "#4338ca",
        },
        lineStyle: {
          width: 3,
          color: "#6366f1",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(99, 102, 241, 0.3)",
              },
              {
                offset: 1,
                color: "rgba(99, 102, 241, 0.05)",
              },
            ],
          },
        },
      },
      {
        name: "Sold Out",
        type: "line",
        smooth: true,
        data: chartData?.soldOut,
        symbol: "circle",
        symbolSize: 6,
        itemStyle: {
          color: "#f97316",
        },
        lineStyle: {
          width: 3,
          color: "#fb923c",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(249, 115, 22, 0.3)",
              },
              {
                offset: 1,
                color: "rgba(249, 115, 22, 0.05)",
              },
            ],
          },
        },
      },
    ],
    animationDuration: 2000,
    animationEasing: "cubicInOut",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-card h-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Inventory Overview
        </h2>
        <div className="flex space-x-2">
          <select
            className="text-sm border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={timeframe}
            onChange={(e) => {
              const newTimeframe = e.target.value as "year" | "month" | "week";
              setTimeframe(newTimeframe);
              updateChartData(newTimeframe);
            }}
          >
            <option value="year">This Year</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
          </select>
        </div>
      </div>
      <ReactECharts
        option={option}
        style={{ height: "300px", width: "100%" }}
        className="transition-all duration-500"
      />
    </div>
  );
};

export default InventoryLineChart;
