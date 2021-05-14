import React, { useState, useEffect } from "react";
import "../css/css.scss";
import { boardApi } from "../../utils/axios";
import { FiEye, FiCalendar } from "react-icons/fi";
import { BiDislike, BiLike } from "react-icons/bi";
function Detail({ data }) {
  console.log(data);
  return (
    <div style={{ flex: 1 }}>
      <hr style={{ height: 3 }}></hr>
      <div id="detailBoardTop">
        <div style={{ flex: 8.5, float: "left", paddingLeft: "10px" }}>
          <div>
            <h1 id="detailBoardTitle">{data.boardTitle}</h1>
            <div>{data.boardWriter}</div>
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
      <div>
        <div id="detailBoardContent">{data.boardContent}</div>
        {/* <BiDislike />
        <BiLike/> */}
      </div>
      <div>{/* 자신의 글이면 삭제하기와 수정하기 활성화하기 */}</div>
    </div>
  );
}

export default function DetailBoard({ match }) {
  const { no } = match.params;
  const [data, setData] = useState({});

  const fill = async () => {
    const res = await boardApi.getDetailBoard(no);
    console.log(res);
    setData(res);
  };

  useEffect(async () => {
    await fill();
  }, []);

  return (
    <div id="detailBoard">
      <Detail data={data} />
    </div>
  );
}
