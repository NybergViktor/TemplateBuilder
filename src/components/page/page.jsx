import "./page.css";
import Spreadsheet from "react-spreadsheet";
import React, { forwardRef } from "react";

export const Page = forwardRef(({ data, setData }, ref) => {
  const handleDataChange = (newData) => {
    setData(newData);
  };

  return (
    <div className="pageMain" ref={ref}>
      <Spreadsheet data={data} onChange={handleDataChange} />
    </div>
  );
});
