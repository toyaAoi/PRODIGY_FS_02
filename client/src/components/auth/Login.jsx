import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../reducers/adminReducer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    // eslint-disable-next-line no-useless-catch
    try {
      await dispatch(loginAdmin(credentials));
      navigate("/dashboard");
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="h-screen max-w-[1080px] mx-auto -mt-12 flex flex-col items-center justify-center">
      <h1 className="text-4xl">Employee Management System</h1>
      <form
        onSubmit={handleLogin}
        className="mt-8 py-8 px-16 w-2/3 bg-slate-100 rounded-lg"
      >
        <h2 className="text-2xl mb-4">Login</h2>
        <div className="input-with-label">
          <label htmlFor="login-username">Username:</label>
          <input
            type="text"
            name="username"
            id="login-username"
            autoComplete="username"
          />
        </div>

        <div className="input-with-label">
          <label htmlFor="login-password">Password:</label>
          <input
            type="password"
            name="password"
            id="login-password"
            autoComplete="password"
          />
        </div>
        <div className="flex justify-end mt-8">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
