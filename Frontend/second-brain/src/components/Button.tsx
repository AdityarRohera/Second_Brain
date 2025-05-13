import type { ReactElement } from "react";


interface ButtonProps {
    variant : "primary" | "secondary";
    size : "sm" | "md" | "lg";
    text : string;
    startIcon? : ReactElement;
    endIcon? : ReactElement;
    onClick : () => void;
}

const buttonVariant = {
    primary : "bg-purple-600 text-white",
    secondary : "bg-purple-200 text-purple-600"
}
const sizeVariant = {
    sm : "w-[50px] , h-[50px]",
    md : "w-[60px] , h-[50px]",
    lg : "w-[200px] , h-[50px]"
}

const commonVariant = {
    property : " rounded-2xl text-[20px] fond-medium flex justify-center items-center gap-4"
}

function Button({variant , size , text , startIcon , endIcon , onClick} : ButtonProps) {
  return <button className={`${buttonVariant[variant]} ${sizeVariant[size]} ${commonVariant["property"]}`} onClick={onClick} >
    {startIcon ? startIcon : ""}
    {text}
    {endIcon ? endIcon : ""}
    </button>
}

export default Button;
