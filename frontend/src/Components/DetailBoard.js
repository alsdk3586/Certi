import React, { useState, useEffect } from "react";
import "../Components/css/css.scss";
import { boardApi } from "../utils/axios";

function DetailTitle({ data }) {
  console.log(data);
  return (
    <div>
      <div id="detailBoardTitle">{data.boardTitle}</div>
      <div>{data.boardCreate}</div>
      <div>{data.boardHit}</div>
      <div>{data.boardWriter}</div>
    </div>
  );
}

export default function DetailBoard({ match }) {
  const { no } = match.params;
  const [data, setData] = useState({});

  const fill = async () => {
    const res = await boardApi.getDetailBoard(no);
    setData(res);
  };

  useEffect(async () => {
    await fill();
  }, []);

  return (
    <div id="detailBoard">
      <DetailTitle data={data} />
    </div>
  );
}
