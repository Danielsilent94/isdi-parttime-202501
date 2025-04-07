import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="burger-loader">
        <div className="bun top"></div>
        <div className="patty"></div>
        <div className="bun bottom"></div>
      </div>
      <p className="loading-text">Loading your burger blissssssssss...</p>
    </div>
  );
};

export default Loader;
