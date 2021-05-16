import React, { useState, useEffect } from "react";
import { commentApi } from "../../utils/axios";
export default function Comment({no }) {
  console.log("123");
  const [comment, setComment] = useState([]);
  useEffect(async () => {
    const fill = async () => {
      const res = await commentApi.getComment(no);
      console.log("comment");
      console.log(res);
      setComment(res);
    };
    await fill();
  }, [comment]);
  
  return (
  <div>
    {comment&&comment.map(el => (
      <div>
        <div>{el.commentContent}</div>
        <div>{el.commentCreate && el.commentCreate.map((e) =>
          (<div>{e}.</div>)
          )}
        </div>
        <div>{el.userId.user_nickname}</div>
      </div>
    ))}
  </div>
  )
}