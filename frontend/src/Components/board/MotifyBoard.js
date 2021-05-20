import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { boardApi } from "../../utils/axios";
import {
  Dropdown,
  DropdownButton,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "../css/css.scss";

export default function CreateBoard({ history,match }) {
  const { no} = match.params;

  const [boardContent, setBoardContent] = useState("");
  const [boardTitle, setBoardTitle] = useState("");
  const [category, setCategory] = useState("");

  useEffect(async () => {
      const fill = async () => {
        const res = await boardApi.getDetailBoard(no);
        setBoardContent(res.board.boardContent);
        setBoardTitle(res.board.boardTitle);
        setCategory(res.board.boardCategory);
      };
      await fill();
    }, []);

  async function motify() {
    let data = new Object();
    data.boardId = no;
    data.boardCategory = category;
    data.boardTitle = document.getElementById("title").value;
    data.boardContent = document.getElementById("content").value;
    const res = await boardApi.motifyBoard(data);
    if (res == 200) history.push(`/board`);
    else {
      alert("수정에 실패했습니다. ");
      history.push(`/dateilBoard/${no}`);
    }
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
          </DropdownButton>
          <FormControl id="title"
            placeholder="제목을 입력해주세요"
            value={boardTitle}
            onChange={(el) => setBoardTitle(el.value)} />
        </InputGroup>
      </div>
      <div>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control id="content"
            as="textarea"
            value={boardContent}
            onChange={(el) => setBoardContent(el.value)} />
        </Form.Group>
      </div>
      <div>
        <Button
          style={{ float: "right" }}
          variant="outline-warning"
          onClick={motify}
        >
          수정
        </Button>
      </div>
    </div>
  );
}
