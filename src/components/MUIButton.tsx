import React from "react";
import { Button, ButtonProps } from "@mui/material";

export const MUIButton: React.FC<ButtonProps> = (props) => {
    return <Button {...props}></Button>;
};

export default MUIButton;
