import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function PieChart(props) {
  const [series, setSeries] = useState([50, 50]);
  const [options, setOptions] = useState({
    chart: {
      type: 'pie',
    },
    labels: ['남', '여']
  });
  const [width, setWidth] = useState();

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
      setWidth(350)
    } else {
      setWidth(450)
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
            options={options}
            series={series}
            type="pie"
            width={width}
          />
        </div>
      </div>
    </div>
  );
}

export default PieChart;