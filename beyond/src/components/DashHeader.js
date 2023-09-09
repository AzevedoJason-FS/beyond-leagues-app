import { React, useEffect, useState } from "react";

import Logo from "../images/logo.svg";
import Discord_icon from "../images/discord.svg";
import Twitter_icon from "../images/twitter.svg";

const DashHeader = () => {

  return (
    <header className="dash-header">
      <div className="social">
        <button className="dash-header__button" title="Home">
          <img src={Logo} alt="Beyond Logo" />
        </button>
        <a href="*">
          <img src={Discord_icon} alt="Discord Logo" id="social__link" />
        </a>
        <a href="https://twitter.com/beyond_card">
          <img src={Twitter_icon} alt="X Logo" id="social__link" />
        </a>
      </div>
      <nav className="header__nav">
        <span>
          <a href="/dash" id="nav_link">
            Home
          </a>
          <a href="/bets" id="nav_link">
            Bets
          </a>
        </span>
      </nav>
    </header>
  );
};

export default DashHeader;
