/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import YearPicker from "../../../global/YearPicker";
// import { DateIcon } from "../../../assets/export";

// Register necessary Chart.js components
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const SubscriptionSalesChart = ({ year, setYear, graphData }) => {
  console.log("🚀 ~ SubscriptionSalesChart ~ graphData:", graphData);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && graphData?.length > 0) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }

      const ctx = chartRef.current.getContext("2d");

      chartInstance.current = new ChartJS(ctx, {
        type: "line",
        data: {
          labels: Object.keys(graphData[0].months),
          datasets: [
            {
              label: "Standard Plan",
              data: Object.values(graphData[0].months),
              borderColor: "#3B82F6",
              backgroundColor: "#3B82F6",
              borderWidth: 3,
              fill: false,
              tension: 0.4,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointHoverBackgroundColor: "#3B82F6",
              pointHoverBorderColor: "#ffffff",
              pointHoverBorderWidth: 2,
            },
            {
              label: "Premium Plan",
              data: Object.values(graphData[1].months),
              borderColor: "#EF4444",
              backgroundColor: "#EF4444",
              borderWidth: 3,
              fill: false,
              tension: 0.4,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointHoverBackgroundColor: "#EF4444",
              pointHoverBorderColor: "#ffffff",
              pointHoverBorderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
              external: function (context) {
                const { chart, tooltip } = context;
                let tooltipEl = document.getElementById("chartjs-tooltip");

                if (!tooltipEl) {
                  tooltipEl = document.createElement("div");
                  tooltipEl.id = "chartjs-tooltip";
                  tooltipEl.style.position = "absolute";
                  tooltipEl.style.pointerEvents = "none";
                  tooltipEl.style.transition = "all 0.1s ease";
                  chart.canvas.parentNode.appendChild(tooltipEl);
                }

                if (tooltip.opacity === 0) {
                  tooltipEl.style.opacity = 0;
                  return;
                }

                if (tooltip.body) {
                  const dataPoint = tooltip.dataPoints[0];
                  const value = dataPoint.parsed.y;
                  const formattedValue =
                    value >= 1000
                      ? `${Math.round(value / 1000)}K`
                      : value.toString();
                  const color = dataPoint.dataset.borderColor;

                  tooltipEl.innerHTML = `
                    <div style="
                      background-color: ${color};
                      color: white;
                      padding: 8px 16px;
                      border-radius: 20px;
                      font-size: 14px;
                      font-weight: 600;
                      white-space: nowrap;
                      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    ">
                      ${formattedValue}
                    </div>
                  `;
                }

                const { offsetLeft: positionX, offsetTop: positionY } =
                  chart.canvas;

                tooltipEl.style.opacity = 1;
                tooltipEl.style.left =
                  positionX + tooltip.caretX - tooltipEl.offsetWidth / 2 + "px";
                tooltipEl.style.top = positionY + tooltip.caretY - 50 + "px";
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              border: {
                display: false,
              },
              ticks: {
                color: "#9CA3AF",
                font: {
                  size: 12,
                  weight: "500",
                },
                padding: 16,
              },
            },
            y: {
              beginAtZero: true,
              max: 100000,
              grid: {
                color: "#F3F4F6",
                borderDash: [2, 2],
              },
              border: {
                display: false,
              },
              ticks: {
                color: "#9CA3AF",
                font: {
                  size: 12,
                  weight: "500",
                },
                padding: 16,
                callback: function (value) {
                  if (value === 0) return "0";
                  if (value >= 1000) return `${value / 1000}K`;
                  return value;
                },
                stepSize: 20000,
              },
            },
          },
          interaction: {
            intersect: true,
            mode: "point",
          },
          elements: {
            point: {
              hoverRadius: 8,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [graphData]);

  return (
    <div className="bg-[#FAFAFA] mt-5 p-8 rounded-[16px] shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Subscription Sales Overview
        </h2>
        <div className="flex  gap-3">
          <div className="w-[200px]">
            <YearPicker
              selectedYear={year}
              setSelectedYear={setYear}
              label="Year of Experience"
              minYear={new Date(2024, 0)}
              maxYear={new Date()}
            />
          </div>
          {/* <div className="w-[200px]">
            <Calender
              endDate={true}
              startDate={endDate ? endDate.toISOString().split("T")[0] : ""}
              setStartDate={handleEndDateChange}
              text={"DD/MM/YY"}
              isStyle={true}
              label={"End Date"}
            />
          </div> */}
        </div>
      </div>
      <hr className="border-[#2121211C]" />

      <div className="flex items-center space-x-6 mb-8 mt-5">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm font-medium text-gray-700">
            Standard Plan
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm font-medium text-gray-700">
            Premium Plan
          </span>
        </div>
      </div>

      <div className="relative">
        <div className="h-96">
          <canvas ref={chartRef} className="w-full h-full"></canvas>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSalesChart;
