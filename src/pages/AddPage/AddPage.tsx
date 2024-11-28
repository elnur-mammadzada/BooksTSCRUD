import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BookValidationSchema } from "../../schemas/validationSchema";
import MUIDialog from "../../components/MUIDialog";
import MUITextField from "../../components/MUITextField";
import MUISelect from "../../components/MUISelect";
import { AddPageProps } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../../store";
import { addBook } from "../../features/booksSlice";
import { MenuItem } from "@mui/material";

const AddPage: React.FC<AddPageProps> = ({ handleClose, open }) => {
    const dispatch = useAppDispatch();
    const { categories, bookById } = useAppSelector((state) => state.books);

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

    const onSubmit = handleSubmit((data: any) => {
        console.log(data);
        dispatch(addBook(data));
        reset();
        handleClose();
        console.log(data);
    });

    return (
        <MUIDialog
            open={open}
            onClose={handleClose}
            title='Kitab əlavə et'
            accept='Əlavə et'
            decline='Bağla'
            onSubmit={onSubmit}>
            <Controller
                control={control}
                name='categoryId'
                render={({ field }) => (
                    <MUISelect
                        name={field.name}
                        selectedValue={String(field.value)}
                        handleChange={(e) => {
                            field.onChange(e);
                            const category = categories?.find(
                                (item) => +item.id === +e.target.value
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

export default AddPage;
