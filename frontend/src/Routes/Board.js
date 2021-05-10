import { Navbar, Form, Button, FormControl, Tabs, Tab } from "react-bootstrap";
import React, { useState } from "react";

import "../Components/css/css.scss";
import BoardList from "../Components/BoardList";

export default function Board() {
  const [key, setKey] = useState("home");

  return (
    <div id="boardContainer">
      <Navbar id="boardNavBar">
        <div id="boardNavBarTab">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey="all" title="ALL">
              {" "}
            </Tab>
            <Tab eventKey="study" title="STUDY"></Tab>
            <Tab eventKey="free" title="FREE"></Tab>
          </Tabs>
          <Tab.Content>
            <BoardList name={key} />
          </Tab.Content>
        </div>

        <div id="boardSearch">
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </Navbar>
    </div>
  );
}
