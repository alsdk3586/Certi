import React, { Component, useState, useEffect } from "react";
import Chart from "react-apexcharts";

function ColumnChart(props) {
  const [series, setSeries] = useState([
    {
      name: '합격비율',
      data: [10.1, 24.0, 8.6, 3.2, 1.4, 0.8,]
    }]
  );
  const [options, setOptions] = useState({
    chart: {
      height: 400,
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
        return val + "%";
      },
      offsetY: -25,
      style: {
        fontSize: '14px',
        colors: ["#304758"]
      }
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
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
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
        show: false,
        formatter: function (val) {
          return val + "%";
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
            options={options}
            series={series}
            type="bar"
            width={width}
          />
        </div>
      </div>
    </div>
  );
}

export default ColumnChart;
