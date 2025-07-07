import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController, // ✅ REQUIRED
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Calender from "../../../global/DatePicker";
// import { DateIcon } from "../../../assets/export";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController, // ✅ Register it here too
  Title,
  Tooltip,
  Legend
);

const ReferralBarChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
          "2025",
        ],
        datasets: [
          {
            label: "Members",
            data: [2.8, 3.0, 3.9, 1.9, 2.8, 3.0, 4.0, 1.9],
            backgroundColor: "#10B981",
            borderRadius: 8,
            barThickness: 40,
          },
          {
            label: "Service Providers",
            data: [2.2, 2.2, 3.5, 0.7, 2.2, 2.2, 3.5, 0.7],
            backgroundColor: "#0891B2",
            borderRadius: 8,
            barThickness: 40,
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

              let tooltipEl = document.getElementById("custom-tooltip");
              if (!tooltipEl) return;

              if (tooltip.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
              }

              const dataPoints = tooltip.dataPoints;

              // Generate tooltip HTML content
              let html = `<div class="bg-gray-200 px-3 py-2 rounded-lg shadow-lg border text-sm">
      <div class="flex flex-col space-y-1">`;

              dataPoints.forEach((dp) => {
                const color = dp.dataset.backgroundColor;
                // const label = dp.dataset.label;
                const value = `${dp.parsed.y.toFixed(1)}M`;

                html += `
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 rounded" style="background:${color}"></div>
          <span class="text-gray-700 font-medium">${value}</span>
        </div>`;
              });

              html += `</div></div>`;
              tooltipEl.innerHTML = html;

              // Position tooltip
              const { offsetLeft: chartX, offsetTop: chartY } = chart.canvas;
              tooltipEl.style.opacity = 1;
              tooltipEl.style.left = `${chartX + tooltip.caretX}px`;
              tooltipEl.style.top = `${chartY + tooltip.caretY - 40}px`;
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
              color: "#6B7280",
              font: {
                size: 12,
                weight: "500",
              },
              padding: 16,
            },
          },
          y: {
            beginAtZero: true,
            max: 5,
            grid: {
              color: "#F3F4F6",
              borderDash: [2, 2],
            },
            border: {
              display: false,
            },
            ticks: {
              color: "#6B7280",
              font: {
                size: 12,
                weight: "500",
              },
              padding: 16,
              callback: (value) => `${value}M`,
              stepSize: 1,
            },
          },
        },
        interaction: {
          intersect: true,
          mode: "index",
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-[#FAFAFA] mt-5 p-8 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Referral</h2>
        <div className="flex  gap-3">
          <div className="w-[200px]">
            <Calender
              endDate={true}
              startDate={startDate ? startDate.toISOString().split("T")[0] : ""}
              setStartDate={setStartDate}
              text={"DD/MM/YY"}
              isStyle={true}
              label={"End Date"}
            />
          </div>
          <div className="w-[200px]">
            <Calender
              endDate={true}
              startDate={endDate ? endDate.toISOString().split("T")[0] : ""}
              setStartDate={setEndDate}
              text={"DD/MM/YY"}
              isStyle={true}
              label={"End Date"}
            />
          </div>
        </div>
      </div>
      <hr className="border-[#2121211C]" />
      <div className="flex items-center space-x-6 mt-4 mb-8">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-emerald-500 rounded"></div>
          <span className="text-sm font-medium text-gray-700">Members</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-cyan-600 rounded"></div>
          <span className="text-sm font-medium text-gray-700">
            Service Providers
          </span>
        </div>
      </div>

      <div className="relative">
        <div
          id="custom-tooltip"
          className="absolute opacity-0 top-16 left-1/4 transform -translate-x-1/2 z-10"
        >
          <div className="bg-gray-200 px-3 py-2 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-gray-600 rounded"></div>
                <span className="text-xs font-semibold text-gray-700">
                  3.1M
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-cyan-600 rounded"></div>
                <span className="text-xs font-semibold text-gray-700">
                  2.3M
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-96">
          <canvas ref={chartRef} className="w-full h-full"></canvas>
        </div>
      </div>
    </div>
  );
};

export default ReferralBarChart;
