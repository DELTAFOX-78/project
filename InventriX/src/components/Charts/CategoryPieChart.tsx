import React from "react";
import ReactECharts from "echarts-for-react";

interface CategoryPieChartProps {
  data: { name: string; value: number }[];
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ data }) => {
  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderColor: "#e0e0e0",
      borderWidth: 1,
      textStyle: {
        color: "#333",
      },
    },
    legend: {
      orient: "horizontal",
      right: "5%",
      top: "top",
      itemWidth: 12,
      itemHeight: 12,
      icon: "circle",
      itemGap: 12,
      formatter: (name: any) => {
        const item = data?.find((d) => d.name === name);
        const value = item ? item.value : 0;
        return `${name}: ${value}`;
      },
      textStyle: {
        color: "#666",
        fontSize: "13px",
        padding: [3, 0, 3, 0],
      },
    },
    series: [
      {
        name: "Product Categories",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["35%", "50%"],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 4,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.2)",
          },
          label: {
            show: true,
            fontSize: "14",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: data?.map((item, index) => {
          // Define a set of colors for the pie chart
          const colors = [
            "#6366f1",
            "#14b8a6",
            "#f97316",
            "#8b5cf6",
            "#ec4899",
            "#ef4444",
            "#f59e0b",
            "#10b981",
            "#3b82f6",
            "#d946ef",
          ];

          return {
            ...item,
            itemStyle: {
              color: colors[index % colors.length],
            },
          };
        }),
      },
    ],
    animationDuration: 1500,
    animationEasing: "cubicInOut",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-card h-full">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Product Categories
        </h2>
        <p className="text-sm text-gray-500">Distribution by product type</p>
      </div>
      <ReactECharts
        option={option}
        style={{ height: "400px", width: "100%" }}
        className="transition-all duration-500"
      />
    </div>
  );
};

export default CategoryPieChart;
