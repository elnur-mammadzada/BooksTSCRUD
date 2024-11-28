import React from "react";
import { Card, CardContent, Typography, CardActions } from "@mui/material";
import MUIButton from "./MUIButton";
import { BookCardProps } from "../types/types";

const BookCard: React.FC<BookCardProps> = ({
    title,
    author,
    categoryName,
    handleDelete,
    handleEditClick,
    description,
}) => {
    return (
        <Card
            sx={{
                maxWidth: 345,
                margin: 2,
            }}>
            <CardContent
                sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant='h6' gutterBottom>
                    {title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    Müəllif: {author}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    Kateqoriya: {categoryName}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    Məlumat: {description}
                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <MUIButton onClick={handleEditClick} variant='contained'>
                    Redaktə et
                </MUIButton>

                <MUIButton onClick={handleDelete} variant='contained' color='error'>
                    Sil
                </MUIButton>
            </CardActions>
        </Card>
    );
};

export default BookCard;
