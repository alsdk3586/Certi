import { certiApi } from "../utils/axios";
import React, { useEffect, useState } from 'react';

export default () => {
  const [certiList, setCertiList] = useState([]);
  useEffect(() => {
    certiApi.getCertiList().then((res) => {
      setCertiList(res)
    });
  }, [certiList])
  return (
    <>
      <ul>
        {certiList.map((data, i) => {
          <li key={i}>{data}</li>
        })}
      </ul>
    </>
  )
}
