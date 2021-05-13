import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { boardApi } from "../../utils/axios";
import Editor from "./Editor";
import {
  Dropdown,
  DropdownButton,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "../css/css.scss";

export default function DetailBoard() {
  const [category, setCategory] = useState("Category");

  async function add() {
    if (category == "Category") {
      alert("카테고리를 선택해주세요 : )");
      return;
    }
    let data = new Object();
    data.boardCategory = category;
    data.boardTitle = document.getElementById("title").value;
    data.boardContent = document.getElementById("content").value;
    const res = await boardApi.addBoard(data);
  }

  return (
    <div id="createBoardContainer">
      <div id="createBoardTitle">
        <InputGroup className="mb-3">
          <DropdownButton
            variant="outline-secondary"
            title={category}
            onSelect={(eventKey) => setCategory(eventKey)}
          >
            <Dropdown.Item eventKey="STUDY">공부 게시판</Dropdown.Item>
            <Dropdown.Item eventKey="FREE">자유 게시판</Dropdown.Item>
            {/* <Dropdown.Divider /> */}
          </DropdownButton>
          <FormControl id="title" placeholder="제목을 입력해주세요" />
        </InputGroup>
      </div>
      <div>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control id="content" as="textarea" />
        </Form.Group>
      </div>
      {/* <Editor /> */}
      <div>
        <Button
          style={{ float: "right" }}
          variant="outline-warning"
          onClick={add}
        >
          Warning
        </Button>
      </div>
    </div>
  );
}
