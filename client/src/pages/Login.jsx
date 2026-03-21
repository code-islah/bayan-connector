import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "../API/axios.js";
import { UserContext } from "../context/UserContext.jsx";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { type, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [type === "email" ? "email" : "password"]: value,
    }));
  };

  const handleClearForm = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/login", formData);
      const { data } = response;

      localStorage.setItem("token", data.token);

      if (data.success) {
        setUser(data.user);
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      // You might want to add user feedback here
    }
  };

  return (
    <div className="h-screen w-full p-3 grid">
      <form
        className="grid self-center gap-1 [&>input]:p-3"
        onSubmit={handleLogin}
      >
        <h1 className="text-xl pb-10 text-darkSub">
          Let's Connect the
          <span className="font-bold text-compYl"> Eloquence</span> of
          <span className="font-bold text-compBl"> Our Hearts</span>
        </h1>

        <input
          className="bg-sec text-dark rounded"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <input
          className="bg-sec text-dark rounded"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        <div className="flex gap-1 [&>button]:flex-1">
          <button
            className="bg-compBl text-dark p-2 rounded"
            type="button"
            onClick={handleClearForm}
          >
            Clear
          </button>

          <button className="bg-compYl text-dark p-2 rounded" type="submit">
            Submit
          </button>
        </div>

        <p className="pt-3 text-dark">
          Don't have an account?
          <Link to="/register">
            <span className="underline text-compYl"> Register</span>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
