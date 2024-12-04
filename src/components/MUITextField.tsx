import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { MUITextFieldProps } from "../types/types";

const MUITextField: React.FC<MUITextFieldProps> = ({
    name,
    control,
    placeholder,
    style,
    label,
    error,
    className,
    type,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    style={style}
                    placeholder={placeholder}
                    label={label}
                    error={error}
                    className={className}
                    type={type}
                />
            )}
        />
    );
};

export default MUITextField;
