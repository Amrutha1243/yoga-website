import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // ✅ LOGIN FLOW
      try {
        const { data: users } = await axios.get("http://localhost:5000/users");
        const user = users.find((u) => u.email === formData.email);

        if (!user) {
          alert("❌ User not registered");
          return;
        }

        const verifyRes = await axios.post("http://localhost:5000/api/verify-password", {
          plainPassword: formData.password,
          hashedPassword: user.password,
        });

        if (!verifyRes.data.valid) {
          alert("❌ Incorrect password");
          return;
        }

        const { data } = await axios.post("http://localhost:5000/api/set-token", {
          email: user.email,
          name: user.name,
          role: user.role || "student",
        });

        localStorage.setItem("token", data.token);
        navigate("/");
      } catch (err) {
        console.error(err);
        alert("❌ Login failed");
      }
    } else {
      // ✅ REGISTER FLOW
      try {
        const { data } = await axios.post("http://localhost:5000/new-user", formData);
        localStorage.setItem("token", data.token);
        navigate("/");
      } catch (err) {
        console.error(err);
        alert("❌ Registration failed");
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg')",
      }}
    >
      <div className="bg-white/20 backdrop-blur-md rounded-xl p-8 shadow-2xl max-w-md w-full text-white">
        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome to <span className="text-green-200">PranaVeda</span>
        </h1>
        <h2 className="text-xl text-center mb-6">{isLogin ? "Login" : "Register"}</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-3 rounded-md bg-white/30 text-white placeholder-white focus:outline-none"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 rounded-md bg-white/30 text-white placeholder-white focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 rounded-md bg-white/30 text-white placeholder-white focus:outline-none"
          />

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-200 underline hover:text-green-300"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
}
