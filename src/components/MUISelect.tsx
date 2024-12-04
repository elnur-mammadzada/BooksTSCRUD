import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MUISelectProps } from "../types/types";

const MUISelect: React.FC<MUISelectProps> = ({
    handleChange,
    selectedValue,
    label,
    children,
    name,

}) => {
    return (
        <FormControl sx={{ m: 1, minWidth: "100px" }} size='small'>
            <InputLabel id='demo-select-small-label'>{label}</InputLabel>
            <Select
                labelId='demo-select-small-label'
                id='demo-select-small'
                value={selectedValue}
                label={label}
                onChange={handleChange}
                name={name}>
                {children}

            </Select>
        </FormControl>
    );
};

export default MUISelect;
