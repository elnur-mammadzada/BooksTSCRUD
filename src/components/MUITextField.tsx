import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { MUITextFieldProps } from "../types/types";

const MUITextField: React.FC<MUITextFieldProps> = ({
    name,
    control,
    placeholder,
    style,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    style={style}
                    placeholder={placeholder}
                    helperText={error?.message}
                />
            )}
        />
    );
};

export default MUITextField;
