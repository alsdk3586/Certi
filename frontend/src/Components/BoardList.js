import { Table } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { boardApi } from "../utils/axios";
import "../Components/css/css.scss";

export default function BoardList(props) {
  console.log(props.name);
  if (props.name == "all") {
    boardApi.getAllBoard();
  }
  return (
    <div id="boardList">
      {props.name}
      <Table responsive>
        <tbody>
          <tr>
            <td>1</td>
            {Array.from({ length: 12 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
          <tr>
            <td>2</td>
            {Array.from({ length: 12 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
          <tr>
            <td>3</td>
            {Array.from({ length: 12 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
