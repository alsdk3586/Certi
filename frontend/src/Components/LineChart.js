import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function LineChart(props) {
  const [series, setSeries] = useState([
    {
      name: "응시자 수",
      data: [50, 49, 60, 70, 91]
    }
  ]);
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: [2017, 2018, 2019, 2020, 2121]
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
            options={options}
            series={series}
            type="area"
            width={width}
          />
        </div>
      </div>
    </>
  );
}

export default LineChart;