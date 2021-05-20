import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function LineChart(props) {
  // const [series, setSeries] = useState([
  //   {
  //     name: "합격률",
  //     data: [50, 49, 60, 70, 91]
  //   }
  // ]);
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: ['고졸이하', '전문대재', '전문대졸', '대재', '대졸', '미상']
    },
    fill: {
      colors: ['#e1eef6', '#fcbe32', '#ff5f2e']
    },
    stroke: {
      curve: 'smooth'
    }
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
      setWidth(1000)
    } else if(window.innerWidth < 1200 && window.innerWidth > 993) {
      setWidth(700)
    } else {
      setWidth(500)
    }
  }
  
  useEffect(() => {
    if (window.innerWidth > 1200) {
      setWidth(1000)
    } else if(window.innerWidth < 1200 && window.innerWidth > 993) {
      setWidth(700)
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
    <>
      <div className="row">
        <div className="mixed-chart">
        <Chart
            {...props}
            options={options}
            // series={series}
            type="line"
            width={width}
          />
        </div>
      </div>
    </>
  );
}

export default LineChart;