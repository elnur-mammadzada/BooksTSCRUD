import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import MUITextField from "../../components/MUITextField";
import "./LoginPage.css";
import { fetchUsersByUsername } from "../../features/authSlice";
import { AppDispatch, useAppSelector } from "../../../store";
import { useNavigate } from "react-router-dom";
import { AuthValidationSchema } from "../../schemas/authSchema";

const LoginPage = () => {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(AuthValidationSchema),
    });

    const dispatch = useDispatch<AppDispatch>();
    const { isAuth } = useAppSelector((state) => state.auth);

    const onSubmit = (data: { username: string; password: string }) => {
        dispatch(fetchUsersByUsername(data));
    };

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAuth") === "true";
        if (isAuthenticated) {
            navigate("/books");
        }
    }, [isAuth, navigate]);

    return (
        <div className='login-container'>
            <h2>Daxil Ol</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <MUITextField
                    name='username'
                    control={control}
                    label='İstifadəçi adı'
                    placeholder='Username daxil edin'
                    className='MUITextField'
                />
                {errors.username && <p className='error'>{errors.username.message}</p>}
                <MUITextField
                    name='password'
                    control={control}
                    label='Şifrə'
                    type='password'
                    className='MUITextField'
                    placeholder='Şifrəni daxil edin'
                />
                {errors.password && <p className='error'>{errors.password.message}</p>}
                <button type='submit'>Daxil ol</button>
            </form>
        </div>
    );
};

export default LoginPage;
