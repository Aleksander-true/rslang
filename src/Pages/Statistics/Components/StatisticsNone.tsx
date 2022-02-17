import React from "react";
import sadFace from "../../../assets/png/sad.png"


const StatisticsNone = () => {

    return (
        <div className="statistics__default">
           
            <p className="statistics__text">Только зарегистрированные пользователи могут просматривать свою статистику</p>
            <img src={sadFace} alt="saf face" className="statistics__sad-img"></img>
            
        </div>
    );
}


export default StatisticsNone;
