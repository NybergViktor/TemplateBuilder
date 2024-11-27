import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
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

  const logout = async () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <h2>TemplateBuilder</h2>
      <button className="logoutButton" onClick={logout}>
        Logga Ut
      </button>
    </div>
  );
};
