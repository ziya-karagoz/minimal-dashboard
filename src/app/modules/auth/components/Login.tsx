import { Helmet } from "react-helmet-async";
import { fetchCurrentUser, login } from "../core/_requests";
import { LoginRequest, useAuth } from "..";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { swal } from "@base/components/common/alerts/SwalAlert";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  //password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { saveAuth, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async ({ email, password, rememberMe }: LoginRequest) => {
    const { accessToken } = await login(email, password).catch((error) => {
      swal.fire({
        title: "Hata",
        text:
          error.response?.data?.message ||
          "Bir hata oluştu. Lütfen tekrar deneyin.",
        icon: "error",
      });
      throw error;
    });
    saveAuth(accessToken, rememberMe);
    const user = await fetchCurrentUser();
    //@ts-ignore
    setCurrentUser(user);
    // not a good way to do this but there is a bug that prevents from navigating to dashboard in AppRoutes.tsx
    navigate("/anasayfa");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <>
      <Helmet>
        <title> Minimal Dashboard Admin | Login </title>
      </Helmet>
      <section className="bg-gray-50 h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-primary-900"
          >
            <svg
              className="w-8 h-8 mr-2"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="#303030"
                stroke-width="6"
              />
              <circle
                cx="50"
                cy="17.6768"
                r="15.6768"
                fill="none"
                stroke="#303030"
                stroke-width="4"
              />
              <path
                d="M58.596 26.7677C58.596 30.9042 55.0282 34.3536 50.505 34.3536C45.9819 34.3536 42.4141 30.9042 42.4141 26.7677C42.4141 22.6313 45.9819 19.1819 50.505 19.1819C55.0282 19.1819 58.596 22.6313 58.596 26.7677Z"
                fill="none"
                stroke="#303030"
                stroke-width="2"
              />
            </svg>
            Minimal Dashboard
          </a>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Hesabına Giriş Yap
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Eposta adresin
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5"
                    placeholder="name@company.com"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="mt-2 text-sm text-primary-600">
                      {formik.errors.email}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Şifren
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 "
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <p className="mt-2 text-sm text-primary-600">
                      {formik.errors.password}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        name="rememberMe"
                        checked={formik.values.rememberMe}
                        onChange={formik.handleChange}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 accent-primary-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500">
                        Beni Hatırla
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-600 hover:underline"
                  >
                    Şifreni mi unuttun?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none disabled:bg-primary-400 focus:ring-primary-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  disabled={!formik.isValid}
                >
                  Giriş Yap
                </button>
                <p className="text-sm font-light text-gray-500">
                  Hesabın yok mu?{" "}
                  <a
                    href="#"
                    className="font-medium text-gray-600 hover:underline"
                  >
                    Kayıt ol
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
