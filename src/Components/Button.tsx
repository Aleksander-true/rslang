import React from "react"

type ButtonPropsType = {
    onClick: any;
    title:string;
    type: "danger"|"success";
}

const Button:React.FC<ButtonPropsType> = ({onClick, title, type}) => {

    return (
        <button className= {`btn btn-${type}`} onClick={onClick}>{title}</button>
    )
}

export default Button