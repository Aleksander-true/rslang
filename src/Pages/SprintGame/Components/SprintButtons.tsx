import React from "react"
import { CLOSE_ICON, FULL_SCREEN_ICON, SOUND_ICON } from "../const"

const SprintButtons = () => {
    return (
      <div className='sprint__header' >
        {CLOSE_ICON}
        <div className='sprint__header__controls'>
          {FULL_SCREEN_ICON}
          {SOUND_ICON} </div>
      </div>
    )
  }

  export default SprintButtons;