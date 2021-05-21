import React, { Component, useState, useEffect } from "react";
import Chart from "react-apexcharts";

function ColumnChart(props) {
  const [options, setOptions] = useState({
    title: {
      text: '연령별 합격자 수',
      align: 'left'
    },
    chart: {
      height: 500,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "명";
      },
      offsetY: -25,
      style: {
        fontSize: '14px',
        colors: ["#304758"]
      }
    },
    fill: {
      colors: ['#fcbe32']
    },
    xaxis: {
      categories: ['10대', '20대', '30대', '40대', '50대', '60대'],
      position: 'bottom',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: true
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#79a6c7',
            colorTo: '#79a6c7',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        formatter: function (val) {
          return val + "명";
        }
      }
    },
  });

  const [width, setWidth] = useState(400);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }
  const handleResizeWidth = () => {
    if (window.innerWidth > 1200) {
      setWidth(500)
    } else if(window.innerWidth < 1200 && window.innerWidth > 993) {
      setWidth(400)
    } else {
      setWidth(450)
    }
  }
  
  useEffect(() => {
    if (window.innerWidth > 1200) {
      setWidth(500)
    } else if(window.innerWidth < 1200 && window.innerWidth > 993) {
      setWidth(400)
    } else {
      setWidth(500)
    }
    window.addEventListener('resize', handleResize);
    window.addEventListener('resize', handleResizeWidth);
    return () => { // cleanup 
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleResizeWidth);
    }  
  }, []);

  return (
    <div>
      <div className="row">
        <div className="mixed-chart">
        <Chart
           {...props}
            options={options}
            // series={series}
            type="bar"
            width={width}
          />
        </div>
      </div>
    </div>
  );
}

export default ColumnChart;
