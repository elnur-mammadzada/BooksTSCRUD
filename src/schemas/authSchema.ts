import * as yup from "yup";

export const AuthValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(2, "Name must be at least 2 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(3, "Password must be at least 3 characters"),
});
