import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "../API/axios.js";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [image, setImage] = useState(null);

  const [isDate, setIsDate] = useState(false);
  const [birthDate, setBirthDate] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  async function handleRegister(e) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert("Password doesn't match!");
    }

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("profileImage", image);
    formData.append("birthDate", birthDate);

    try {
      const res = await axios.post("/auth/reg", formData);
      localStorage.setItem("token", res.data.token);

      if (res.data.success) {
        window.location.href = "/";
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="h-screen w-full p-3 grid">
      <form
        className="grid self-center gap-1 [&>input]:p-3"
        onSubmit={handleRegister}
      >
        <h1 className="text-xl pb-10 text-darkSub">
          Speak <span className="font-bold text-compYl">Clearly, </span>Connect{" "}
          <span className="font-bold text-compBl"> Deeply</span>{" "}
        </h1>
        <input
          name="name"
          className="bg-sec text-dark rounded"
          type="text"
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          name="email"
          className="bg-sec text-dark rounded"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          name="password"
          className="bg-sec text-dark rounded"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          name="confirmPassword"
          className="bg-sec text-dark rounded"
          type="password"
          placeholder="Re-type Password"
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-1">
          <input
            name="birthDate"
            className="appearance-none p-3 text-dark bg-sec rounded"
            type={isDate ? "date" : "text"}
            placeholder="Birth date"
            value={birthDate}
            onFocus={(e) => {
            e.currentTarget.type= "date";
            setIsDate(true);
            setTimeout(()=>{
                e.currentTarget.showPicker();
            },0);
            }}
            onBlur={() => {
              if (!birthDate) {
                setIsDate(false);
              }
            }}
            onChange={(e) => {
              setBirthDate(e.target.value);
            }}
          />
          <input
            name="profileImage"
            className="appearance-none text-dark bg-sec p-3 rounded"
            type="file"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex gap-1 [&>button]:flex-1">
          <button className="bg-compBl text-dark p-2 rounded" type="submit">
            Clear
          </button>
          <button className="bg-compYl text-dark p-2 rounded" type="clear">
            Submit
          </button>
        </div>
        <p className="pt-3 text-dark">
          Already have an account?{" "}
          <Link to="/login">
            <span className="underline text-compYl">Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
