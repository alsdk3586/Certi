import { Table } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { boardApi } from "../../utils/axios";
import "../css/css.scss";
import { Link } from "react-router-dom";

export default function BoardList(props) {
  const [data, setData] = useState(props.data);

  const fill = async () => {
    const res = await boardApi.getAllBoard();
    console.log(res);
    setData(res);
    console.log(data);
  };
  useEffect(() => {
    switch (props.name) {
      case "all":
        fill();
        break;
      case "study":
        setData();
        break;
      case "free":
        setData();
    }
  }, [props.name]);

  return (
    <div id="boardList">
      <Table id="boardListTable" responsive hover>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일시</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((article) => (
              <tr key={article.boardId}>
                <td>{article.boardId}</td>
                <td>
                  <Link to={`/detailboard/${article.boardId}`}>
                    {article.boardTitle}
                  </Link>
                </td>
                <td>{article.boardWriter}</td>
                <td>{article.boardCreate}</td>
                <td>{article.hit}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
