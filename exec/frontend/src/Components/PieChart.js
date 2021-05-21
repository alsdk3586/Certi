import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function PieChart(props) {
  const [options, setOptions] = useState({
    title: {
      text: '성별 합격자 수',
      align: 'left'
    },
    chart: {
      type: 'pie',
      height: 400,
    },
    labels: ['남', '여'],
    legend: {
      markers: {
        fillColors: ['#4dbaff', '#a7dafa'],
      },
      position: 'bottom'
    },
    fill: {
      colors: ['#4dbaff', '#a7dafa']
    }
  });

  const [width, setWidth] = useState();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
    });
  }

  const handleResizeWidth = () => {
    if (window.innerWidth > 1200) {
      setWidth(400)
    } else if(window.innerWidth < 1200 && window.innerWidth > 993) {
      setWidth(350)
    } else {
      setWidth(350)
    }
  }
  
  useEffect(() => {
    if (window.innerWidth > 1200) {
      setWidth(500)
    } else if(window.innerWidth < 1200 && window.innerWidth > 993) {
      setWidth(350)
    } else {
      setWidth(450)
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
            type="pie"
            width={width}
          />
        </div>
      </div>
    </div>
  );
}

export default PieChart;