import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import "./Login.css";
const Layout = () => {
  const [page, setPage] = useState("login");
  function setPageHandler(params) {
    setPage(params);
  }
  return (
    <>
      <h1>
        Lystloc
      </h1>
      <div className="login_page_layout">
        <lottie-player
          src="https://lottie.host/f3d1ee54-1e97-47ea-bfce-715c8a9c1e6c/MHsTw861by.json"
          direction="1"
          id='animate_logo'
          mode="normal"
          speed="1"
          loop
          autoplay
        />
        {page === "login" && <Login onSetPage={setPageHandler} />}
        {page === "signup" && <SignUp onSetPage={setPageHandler} />}
      </div>
    </>
  );
};

export default Layout;
