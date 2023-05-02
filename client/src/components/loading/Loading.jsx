import React from "react";
import style from "./loading.module.css";
import loading from "../../images/loading.png";

const Loading = ({ width, height }) => {
  return (
    <img
      className={style.spin}
      style={{ width, height }}
      src={loading}
      alt="loading"
    />
  );
};

export default Loading;
