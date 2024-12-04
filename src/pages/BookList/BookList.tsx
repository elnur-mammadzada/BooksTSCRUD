import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import BookCard from "../../components/BookCard";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
    closeSnackbar,
    deleteBooks,
    fetchBooks,
    fetchCategories,
    fetchCategoriesById,
    getById,
    setSelectedId,
} from "../../features/booksSlice";
import MUISelect from "../../components/MUISelect";
import { MenuItem, SelectChangeEvent, Snackbar } from "@mui/material";
import MUIButton from "../../components/MUIButton";
import { Book } from "../../types/types";
import UpdatePage from "../UpdataPage/UpdatePage";
import AddPage from "../AddPage/AddPage";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/authSlice";

const BookList = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const { books, snackbarMessage, isSnackbarOpen } = useAppSelector(
        (state) => state.books
    );
    const { categories } = useAppSelector((state) => state.books);
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
    const [addDialogOpen, setAddDialogOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchBooks());
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedValue(event.target.value);
        const id = +event.target.value;
        dispatch(fetchCategoriesById(id));
    };

    const handleRefresh = () => {
        dispatch(fetchBooks());
        setSelectedValue("");
    };

    const handleDelete = (id: number) => {
        dispatch(deleteBooks(id));
    };

    const handleEditClick = (book?: Book) => {
        if (book) {
            dispatch(getById(book.id));
            dispatch(setSelectedId(book.id));
            setSelectedBook(book);
            setOpen(true);
        } else {
            console.log("Məlumat tapılmadı");
        }
    };

    const handleAddDialogOpen = () => {
        setAddDialogOpen(true);
    };

    const handleAddDialogClose = () => {
        setAddDialogOpen(false);
    };

    const handleCloseSnackbar = () => {
        dispatch(closeSnackbar());
    };

    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <MUISelect
                    handleChange={handleChange}
                    selectedValue={selectedValue}
                    label='Mövzu'>
                    {categories?.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </MUISelect>
                <MUIButton onClick={handleRefresh}>Yenilə</MUIButton>
                <MUIButton onClick={handleAddDialogOpen}>Əlavə et</MUIButton>
                <MUIButton onClick={handleLogout}>Çıxış edin</MUIButton>
            </div>

            <Grid container spacing={2}>
                {books?.map((book) => (
                    <Grid size={4} key={book.id}>
                        <BookCard
                            categoryName={book?.categoryName}
                            title={book?.title}
                            author={book?.author}
                            description={book.description}
                            handleDelete={() => handleDelete(book.id)}
                            handleEditClick={() => handleEditClick(book)}
                        />
                    </Grid>
                ))}
            </Grid>
            {selectedBook && (
                <UpdatePage
                    selectedBook={selectedBook}
                    open={open}
                    handleClose={() => setOpen(false)}
                    label='Mövzu'
                />
            )}
            <AddPage open={addDialogOpen} handleClose={handleAddDialogClose} />
            <Snackbar
                onClose={handleCloseSnackbar}
                open={isSnackbarOpen}
                autoHideDuration={1000}
                message={snackbarMessage}
            />
        </>
    );
};

export default BookList;
