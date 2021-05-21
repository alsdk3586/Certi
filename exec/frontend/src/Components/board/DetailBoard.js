import React, { useState, useEffect } from "react";
import "../css/css.scss";
import { boardApi,commentApi } from "../../utils/axios";
import { FiEye, FiCalendar } from "react-icons/fi";
import { Form, Button } from "react-bootstrap";

import { Link } from "react-router-dom";
function Detail({ data, isWriter, history }) {
  async function deleteB() {
    const res = await boardApi.deleteBoard(data.boardId);
    alert("삭제 성공");
    document.location.href = "/board";
  }
  return (
    <div style={{ flex: 1 }}>
      <hr style={{ height: 3 }}></hr>
      <div id="detailBoardTop">
        <div style={{ flex: 8.5, float: "left", paddingLeft: "10px" }}>
          <div>
            <h1 id="detailBoardCategory">[{data.boardCategory}]</h1>
            <h1 id="detailBoardTitle">{data.boardTitle}</h1>
            <div style={{padding:"10px"}}>{data.boardWriter}</div>
          </div>
        </div>
        <div style={{ flex: 1.5 }}>
          <div>
            <div>
              <FiCalendar />
              &nbsp;&nbsp;&nbsp;
              {data.boardCreate}
            </div>
            <br></br>
            <div>
              <FiEye />
              &nbsp;&nbsp;&nbsp;
              {data.boardHit}
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <div>{isWriter ?
        <div>
          <div style={{float:"left"}}><Link to={`/motifyBoard/${data.boardId}`}>수정 &nbsp;</Link></div>
          <div><Link onClick={deleteB}>삭제</Link></div>
        </div>
        : <div></div>}
        </div>
      <div>
        <div id="detailBoardContent">{data.boardContent!==undefined?data.boardContent.split("\n").map((line) => {
          return (<span>
                {line}
                <br />
              </span>
            );
        }) : <div></div>}</div>
        <p></p>
        {/* <BiDislike />
        <BiLike/> */}
      </div>
      <div>{/* 자신의 글이면 삭제하기와 수정하기 활성화하기 */}</div>
    </div>
  );
}

export default function DetailBoard({ match }) {
  const { no } = match.params;
  const [board, setBoard] = useState({});
  const [comment, setComment] = useState([]);
  const [writer, setWriter] = useState(0);

  useEffect(async () => {
    const fill = async () => {
      const res = await boardApi.getDetailBoard(no);
      setBoard(res.board);
      setComment(res.comment);
      if (localStorage.getItem('authenticatedUser') === res.board.boardWriter) {
        setWriter(1);
      }
    };
    await fill();
  }, []);


  async function createComment() {
    let data = new Object();
    data.boardId = no;
    data.commentContent = document.getElementById("contentComment").value;
    let res=await commentApi.addComment(data);
    if (res == false)
      alert("댓글 등록에 실패하였습니다.");
    else {
      const res = await commentApi.getComment(no);
      setComment(res);
      document.getElementById("contentComment").value = "";
    }
  }



  return (
    <div id="detailBoard">
      <Detail data={board} isWriter={writer} />
      <div id="detailCommentInput">
        <Form.Control id="contentComment" as="textarea" />
        <Button variant="outline-primary" style={{height:"100%", width:"10%"}} onClick={createComment}>댓글 작성</Button>
      </div>
      <div id="detailCommentList">
        {comment&&comment.map(el => (
          <div id="detailComment">
            <div>
              <div style={{float:"left", padding:"auto 0"}}>
                <div style={{ fontWeight: "bold",float:"left" }}>{el.userId.user_nickname}</div>
                <div style={{ float: "left", width:"100%", fontSize:'10px' }}>
                  {el.commentCreate && el.commentCreate.map((e) =>
                  (<div  style={{float:"left"}}>{e}.</div>)
                  )}
                </div>
              </div>
            </div>
            <div>
              <div id="detailCommentContent">{el.commentContent}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
