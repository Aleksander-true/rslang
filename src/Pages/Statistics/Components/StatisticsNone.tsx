import React from "react";
import sadFace from "../../../assets/png/sad.png"


const StatisticsNone = () => {

    return (
        <>
            <p>Только зарегистрированные пользователи могут просматривать свою статистику</p>
            <img src={sadFace} alt="saf face"></img>
        </>
    );
}


export default StatisticsNone;
