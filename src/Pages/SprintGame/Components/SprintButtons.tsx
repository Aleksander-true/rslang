import React from "react";
import { NavLink } from "react-router-dom";
import { CLOSE_ICON, FULL_SCREEN_ICON, SOUND_ICON } from "../const";

const SprintButtons = () => {
  return (
    <div className="sprint__header">
      <NavLink to="/">{CLOSE_ICON}</NavLink>
      <div className="sprint__header__controls">
        {FULL_SCREEN_ICON}
        {SOUND_ICON}
      </div>
    </div>
  );
};

export default SprintButtons;
