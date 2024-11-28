import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BookValidationSchema } from "../../schemas/validationSchema";
import MUIDialog from "../../components/MUIDialog";
import MUITextField from "../../components/MUITextField";
import MUISelect from "../../components/MUISelect";
import { UpdatePageProps } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
    deleteBooks,
    fetchCategories,
    updateBooks,
} from "../../features/booksSlice";
import { MenuItem } from "@mui/material";

const UpdatePage: React.FC<UpdatePageProps> = ({ handleClose, open }) => {
    const dispatch = useAppDispatch();
    const { categories, selectedId, bookById } = useAppSelector(
        (state) => state.books
    );

    const { setValue, handleSubmit, control, reset } = useForm({
        resolver: yupResolver(BookValidationSchema),
        defaultValues: {
            categoryName: bookById?.categoryName || "",
            title: bookById?.title || "",
            author: bookById?.author || "",
            description: bookById?.description || "",
            categoryId: bookById?.categoryId || "",
        },
    });

    console.log(bookById);
    useEffect(() => {
        if (bookById) {
            console.log(bookById);
            setValue("categoryName", bookById.categoryName || "");
            setValue("categoryId", bookById?.categoryId);

            setValue("title", bookById.title || "");
            setValue("author", bookById.author || "");
            setValue("description", bookById.description || "");
        }
    }, [bookById, setValue]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const onSubmit = (data: any) => {
        dispatch(updateBooks({ id: selectedId, ...data }));
        handleClose();
        reset();
    };
    console.log(selectedId);

    const handleDeleteClick = () => {
        dispatch(deleteBooks(selectedId));
        handleClose();
    };

    return (
        <MUIDialog
            open={open}
            onClose={handleClose}
            onDelete={handleDeleteClick}
            title='Kitabı Yenilə'
            accept='Yenilə'
            decline='Bağla'
            remove='Sil'
            onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name='categoryId'
                render={({ field }) => (
                    <MUISelect
                        name={field.name}
                        selectedValue={String(field.value)}
                        handleChange={(e) => {
                            field.onChange(e);
                            console.log(e.target);
                            const category = categories?.find(
                                (item: any) => item.id == e.target.value
                            );
                            setValue("categoryName", category?.name || "");
                        }}
                        label='Mövzu'>
                        {categories?.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </MUISelect>
                )}
            />
            <MUITextField
                name='title'
                placeholder='Başlıq'
                style={{ width: "100%" }}
                control={control}
            />
            <MUITextField
                name='author'
                placeholder='Müəllif'
                style={{ width: "100%" }}
                control={control}
            />
            <MUITextField
                name='description'
                placeholder='Təsvir'
                style={{ width: "100%" }}
                control={control}
            />
        </MUIDialog>
    );
};

export default UpdatePage;
