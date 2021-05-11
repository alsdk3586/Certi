import React, { Component } from "react";
import Chart from "react-apexcharts";

class PieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [51, 49],
      options: {
        chart: {
          type: 'pie',
        },
        labels: ['남', '여'],

      },
    };
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="pie"
              width="400"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PieChart;