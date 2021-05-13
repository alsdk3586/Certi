import { Navbar, Form, Button, FormControl, Tabs, Tab } from "react-bootstrap";
import React, { useState } from "react";

import "../Components/css/css.scss";
import BoardList from "../Components/board/BoardList";

import { boardApi } from "../utils/axios";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Board() {
  const [key, setKey] = useState("all");
  const [data, setData] = useState();
  return (
    <div id="boardContainer">
      <Navbar id="boardNavBar">
        <div id="boardNavBarTab">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={async (k) => {
              const res = await boardApi.getAllBoard();
              setData(res);
              setKey(k);
            }}
          >
            <Tab eventKey="all" title="ALL"></Tab>
            <Tab eventKey="study" title="STUDY"></Tab>
            <Tab eventKey="free" title="FREE"></Tab>
          </Tabs>
          <Tab.Content>
            <BoardList name={key} data={data} />
          </Tab.Content>
        </div>
        <div id="boardCreateBtn">
          <div>
            <Link to={`/createBoard`}>
              <FaPencilAlt />
            </Link>
          </div>
        </div>
        <div id="boardSearch">
          <Form inline>
            <FormControl type="text" placeholder="Search" className=" mr-m-2" />
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </Navbar>
    </div>
  );
}
