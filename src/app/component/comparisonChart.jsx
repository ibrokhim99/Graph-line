import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ComparisonChart = ({ data1, data2 }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); 
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Object.keys(data1),
          datasets: [
            {
              label: 'Data 1',
              data: data1?.map((i)=> i?.price),
              fill: false,
              borderColor: 'rgba(255, 99, 132, 1)',
              tension: 0.1
            },
            {
              label: 'Data 2',
              data: data2?.map((i)=> i?.price),
              fill: false,
              borderColor: 'rgba(54, 162, 235, 1)',
              tension: 0.1
            }
          ]
        },
        options: {
          scales: {

            x: {
              display: true,
              title: {
                display: true,
                text: 'Quantity'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Price'
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); 
      }
    };
  }, [data1, data2]);

  return <canvas ref={chartRef}  />;
};

export default ComparisonChart;
