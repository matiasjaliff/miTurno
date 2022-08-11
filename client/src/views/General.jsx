import React from "react";

import style from "../styles/General.module.css";

const General = () => {
  return (
    <div className={style.mainContainer}>
      <div className={style.logoContainer}>
        <img
          className={style.largeLogo}
          src={require("../images/1.png")}
          alt="miTurno"
        />
        <img
          className={style.smallLogo}
          src={require("../images/2.png")}
          alt="miTurno"
        />
      </div>
      <div className={style.contentContainer}>
        <div></div>
      </div>
    </div>
  );
};

export default General;
