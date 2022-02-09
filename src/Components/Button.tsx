import React from "react"

type ButtonPropsType = {
    onClick: any;
    title:string;
    type: "danger"|"success";
    action: string;
}

const Button:React.FC<ButtonPropsType> = ({onClick, title, type, action}) => {

    return (
        <button className= {`btn btn-${type}`} onClick={() => onClick(action)}>{title}</button>
    )
}

export default Button