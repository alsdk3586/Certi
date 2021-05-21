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
import { Route, Router, withRouter } from "react-router";

export default function CreateBoard({ history, location }) {
  const [category, setCategory] = useState("Category");

  async function add() {
    if (category == "Category") {
      alert("카테고리를 선택해주세요 : )");
      return;
    }
    let data = new Object();
    data.boardCategory = category;
    data.boardTitle = document.getElementById("title").value;
    data.boardContent = document.getElementById("contentCreate").value;
    const res = await boardApi.addBoard(data);
    if (res == true) history.push(`/board`);
  }

  if (localStorage.getItem('authenticatedUser') === null) {
    alert("로그인이 필요합니다.");
    history.push('/login');
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
            <Dropdown.Item eventKey="study">공부 게시판</Dropdown.Item>
            <Dropdown.Item eventKey="free">자유 게시판</Dropdown.Item>
            {/* <Dropdown.Divider /> */}
          </DropdownButton>
          <FormControl id="title" placeholder="제목을 입력해주세요" />
        </InputGroup>
      </div>
      <div>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control id="contentCreate" as="textarea" />
        </Form.Group>
      </div>
      {/* <Editor /> */}
      <div>
        <Button
          style={{ float: "right", padding:"10px",marginTop:"10px" }}
          variant="outline-warning"
          onClick={add}
        >
          추가하기
        </Button>
      </div>
    </div>
  );
}
