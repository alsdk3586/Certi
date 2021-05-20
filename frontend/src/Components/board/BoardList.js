import { Table } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { boardApi } from "../../utils/axios";
import "../css/css.scss";
import { Link } from "react-router-dom";

export default function BoardList(props) {
  const [data, setData] = useState(props.data);

  const allFill = async () => {
    const res = await boardApi.getAllBoard();
    setData(res);
  };

  const categoryFill = async (category) => {
    const res = await boardApi.getCategoryBoard(category);
    setData(res);
  };

  const searchFill = async (search) => {
    const res = await boardApi.getSearchBoard(search);
    setData(res);
  };

  useEffect(() => {
    switch (props.name) {
      case "all":
        allFill();
        break;
      case "study":
        categoryFill("study");
        break;
      case "free":
        categoryFill("free");
        break;
      default:
        searchFill(props.name);
    }
  }, [props.name]);

  return (
    <div id="boardList">
      <Table id="boardListTable" responsive hover>
        <thead>
          <tr>
            {/* <th>번호</th> */}
            <th>카테고리</th>
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
                {/* <td>{article.boardId}</td> */}
                <td>[{article.boardCategory}]</td>
                <td>
                  <Link to={`/detailboard/${article.boardId}`}>
                    {article.boardTitle}
                  </Link>
                </td>
                <td>{article.boardWriter}</td>
                <td>{article.boardCreate}</td>
                <td>{article.boardHit}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
