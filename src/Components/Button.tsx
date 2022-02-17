import React from "react"

type ButtonPropsType = {
    onClick: any;
    title:string;
    type: "danger"|"success";
    classType: string;
}

const Button:React.FC<ButtonPropsType> = ({onClick, title, type, classType}) => {

    return (
        <button className= {`btn btn-${type} ${classType} `} onClick={onClick}>{title}</button>
    )
}

export default Button