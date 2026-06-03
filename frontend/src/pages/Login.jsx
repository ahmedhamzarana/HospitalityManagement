import axios from "axios";
import { Hotel, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setAlert({ type: "", message: "" });
    setErrors({});

    // ✅ FRONTEND VALIDATION
    if (!formData.email || !formData.password) {
      return setAlert({
        type: "error",
        message: "Email and Password are required",
      });
    }

    axios
      .post("http://localhost:5000/api/auth/login", formData)
      .then((res) => {
        const { token, user } = res.data;

        setAlert({
          type: "success",
          message: "Login successful!",
        });

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", user?.role || "user");

        window.dispatchEvent(new Event("storage"));

        setTimeout(() => {
          navigate('/');
        }, 500);
      })
      .catch((error) => {
        const backendErrors = error.response?.data?.errors;

        if (backendErrors) {
          const firstError = Object.values(backendErrors)[0];

          setAlert({
            type: "error",
            message: firstError || "Validation error",
          });

          setErrors(backendErrors);
        } else {
          setAlert({
            type: "error",
            message: "Something went wrong. Please try again later.",
          });
        }
      });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-sidebar text-sidebar-foreground">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold">
            LuxuryStay
          </div>
          <div className="font-display text-3xl mt-2">
            Hospitality HMS
          </div>
        </div>

        <div>
          <h2 className="font-display text-4xl leading-tight">
            Welcome back to <span className="text-gold">LuxuryStay</span>
          </h2>
          <p className="mt-4 text-sidebar-foreground/70 max-w-md">
            Manage rooms, bookings and hotel operations easily.
          </p>
        </div>

        <div className="text-xs text-sidebar-foreground/60">
          © {new Date().getFullYear()} LuxuryStay Hospitality
        </div>
      </div>

     {/* RIGHT FORM */}
<div className="flex items-center justify-center min-h-screen p-8">
  <form onSubmit={handleSubmit} className="w-full max-w-md">

    <div className="flex items-center gap-2 text-primary mb-6">
      <Hotel className="w-6 h-6" />
      <span className="font-display text-xl">Sign in</span>
    </div>

    <h1 className="font-display text-3xl text-foreground">
      Staff Portal
    </h1>

    <p className="text-sm text-muted-foreground mt-1">
      Enter your credentials to continue.
    </p>

    {/* ALERT */}
    {alert.message && (
      <div className={`mt-4 p-3 rounded-md text-sm font-medium border
        ${alert.type === "error"
          ? "bg-red-50 text-red-700 border-red-200"
          : "bg-green-50 text-green-700 border-green-200"
        }`}>
        {alert.message}
      </div>
    )}

    {/* FORM */}
    <div className="mt-6 space-y-4">

      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          className="mt-1 w-full h-10 px-3 rounded-md border bg-card text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Password</label>
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          className="mt-1 w-full h-10 px-3 rounded-md border bg-card text-sm"
        />
      </div>

    </div>

    <button
      type="submit"
      className="mt-6 w-full h-10 rounded-md bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:bg-primary/90"
    >
      <LogIn className="w-4 h-4" />
      Sign in
    </button>

    <p className="mt-4 text-sm text-muted-foreground text-center">
      New staff member?{" "}
      <Link to="/register" className="text-primary font-medium hover:underline">
        Create an account
      </Link>
    </p>

  </form>
</div>
    </div>
  );
}