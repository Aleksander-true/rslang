import React, { useEffect } from "react";
import { FullScreenHandle } from "react-full-screen";
import { NavLink } from "react-router-dom";
import {
  CLOSE_ICON,
  FULL_SCREEN_ICON,
  NO_FULL_SCREEN_ICON,
  NO_SOUND_ICON,
  SOUND_ICON,
} from "../const";

type SprintButtonsPropsType = {
  muted: boolean;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>;
  handle: FullScreenHandle;
};

const SprintButtons: React.FC<SprintButtonsPropsType> = ({
  muted,
  setMuted,
  handle,
}) => {
  return (
    <div className="sprint__header">
      <NavLink to="/">{CLOSE_ICON}</NavLink>
      <div className="sprint__header__controls">
        <div
          onClick={() => {
            if (handle.active) {
              handle.exit();
            } else {
              handle.enter();
            }
          }}
        >
          {handle.active ? NO_FULL_SCREEN_ICON : FULL_SCREEN_ICON}
        </div>
        <div
          onClick={() => {
            if (muted) {
              setMuted(false);
            } else setMuted(true);
          }}
        >
          {muted ? NO_SOUND_ICON : SOUND_ICON}
        </div>
      </div>
    </div>
  );
};

export default SprintButtons;
