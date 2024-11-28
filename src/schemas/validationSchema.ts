import * as yup from "yup";

export const BookValidationSchema = yup.object().shape({
  categoryName: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 2 characters"),
  categoryId: yup.string(),
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters"),
  author: yup
    .string()
    .required("Author name is required")
    .min(2, "Author Name must be at least 2 characters"),
  description: yup
    .string()
    .required("Description name is required")
    .min(2, "Description Name must be at least 2 characters"),
});
