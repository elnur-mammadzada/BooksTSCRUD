import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { MUIDialogProps } from "../types/types";

const MUIDialog: React.FC<MUIDialogProps> = ({
    open,
    onClose,
    children,
    title,
    accept,
    decline,
    onSubmit,
    onDelete,
    remove
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <div>
                    <Button onClick={onDelete}> {remove}</Button>
                </div>
                <div>
                    <Button onClick={onSubmit} color='primary'>
                        {accept}
                    </Button>
                    <Button onClick={onClose} color='secondary'>
                        {decline}
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
};

export default MUIDialog;
