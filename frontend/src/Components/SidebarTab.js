import React, { Component } from "react";
import SideTabs from "./SideTabs";
import Sidebar from "react-sidebar";

class SidebarTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
  render() {
    // console.log("props: ", this.props.data);
    return (
      <>
        <Sidebar
          sidebar={<SideTabs data={this.props.data} />}
          // open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white", right: 0, width: "100%" } }}
          pullRight={true}
          shadow={true}
          docked={true}
          transitions={false}
        >
          {/* <button onClick={() => this.onSetSidebarOpen(true)}>
            Open sidebar
          </button> */}
        </Sidebar>
      </>
    );
  }
}

export default SidebarTab;
