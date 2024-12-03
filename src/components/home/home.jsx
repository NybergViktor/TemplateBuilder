import React, { useState, useEffect, useRef } from "react";
import { useHref, useNavigate } from "react-router-dom";
import "./home.css";
import { Page } from "../page/page";
import { useReactToPrint } from "react-to-print";

export const Home = () => {
  const navigate = useNavigate();
  const pageRef = useRef();
  //spara tills vidare
  // const onSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("http://localhost:3001/api/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({}),
  //     });

  //     if (response.ok) {
  //       alert("");
  //     } else {
  //       alert("");
  //     }
  //   } catch (error) {
  //     alert("");
  //   }
  // };
  const [data, setData] = useState(
    () =>
      JSON.parse(localStorage.getItem("data")) ||
      Array.from({ length: 36 }, () =>
        Array.from({ length: 7 }, () => ({ value: "" }))
      )
  );

  useEffect(() => {
    const savedData = localStorage.getItem("data");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const handleAddRow = () => {
    setData((prevData) => {
      if (prevData.length > 0) {
        const newRow = prevData[0].map(() => ({ value: "" }));
        return [...prevData, newRow];
      } else {
        // Standard row if there aint one
        return [...prevData, [{ value: "" }, { value: "" }]];
      }
    });
  };
  const handleAddColumn = () => {
    setData((prevData) => prevData.map((row) => [...row, { value: "" }]));
  };
  const handleDelRow = () => {
    setData((prevData) => {
      if (prevData.length > 0) {
        return prevData.slice(0, -1);
      }
      return prevData;
    });
  };
  const handleDelColumn = () => {
    setData((prevData) =>
      prevData.map((row) => {
        if (row.length > 0) {
          return row.slice(0, -1);
        }
        return row;
      })
    );
  };
  const handleDelSpreadSheet = () => {
    localStorage.removeItem("data");
    window.location.reload(); // reload
  };
  const logout = async () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  const handlePrint = useReactToPrint({
    content: () => pageRef.current,
  });

  return (
    <div>
      <h2>TemplateBuilder</h2>
      <main className="homeMain">
        <div className="homeInnerMain">
          <div className="settingsMain">
            <div className="settings">
              <div className="pageAdd">
                <button onClick={handleAddColumn}>Add Column</button>
                <button onClick={handleAddRow}>Add Row</button>
              </div>
              <div className="pageDel">
                <button onClick={handleDelColumn}>Delete Column</button>
                <button onClick={handleDelRow}>Delete Row</button>
              </div>
              <button onClick={handleDelSpreadSheet}>Töm Ark</button>
            </div>
          </div>
          <div className="a4main" ref={pageRef}>
            <Page ref={pageRef} data={data} setData={setData} />
          </div>
        </div>
        <button onClick={handlePrint}>Skriv ut</button>
        <button className="logoutButton" onClick={logout}>
          Logga Ut
        </button>
      </main>
    </div>
  );
};
