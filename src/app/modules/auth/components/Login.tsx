import { Helmet } from "react-helmet-async";
import { fetchCurrentUser, login } from "../core/_requests";
import { useAuth } from "..";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("AUTH.LOGIN.FORM.EMAIL.INVALID")
    .required("AUTH.LOGIN.FORM.EMAIL.REQUIRED"),
  password: Yup.string().required("AUTH.LOGIN.FORM.PASSWORD.REQUIRED"),
});

const Login = () => {


  const { saveAuth, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("login");
      const { accessToken } = await login("ziya@identi.com", "123456");
      saveAuth(accessToken, true);
      const user = await fetchCurrentUser();
      //@ts-ignore
      setCurrentUser(user);
      // not a good way to do this but there is a bug that prevents from navigating to dashboard in AppRoutes.tsx
      navigate("/dashboard");
    } catch (error) {
      console.error("ERR: ", error);
    }
  }

  return (
    <>
      <Helmet>
        <title> Identi Backoffice </title>
      </Helmet>
      <button onClick={handleLogin}>Login</button>

    </>
  );
};

export default Login;
