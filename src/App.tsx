import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import BookList from "./pages/BookList/BookList";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useEffect } from "react";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuth") === "true";
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);
  return (

    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/books' element={<BookList />} />
    </Routes>

  );
};

export default App;
