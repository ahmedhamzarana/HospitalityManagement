import { Hotel, UserPlus } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "guest",
    status: "active",
  });

  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");

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

    setErrors({});
    setAlertMessage("");

    axios
      .post("http://localhost:5000/api/auth/register", formData)
      .then((response) => {
        console.log("User created successfully:", response.data);
        navigate("/login");
      })
      .catch((error) => {
        const backendErrors = error.response?.data?.errors;

        if (backendErrors) {
          setErrors(backendErrors);
        } else {
          setAlertMessage("Something went wrong. Please try again later.");
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
            Join the <span className="text-gold">LuxuryStay</span> team
          </h2>
          <p className="mt-4 text-sidebar-foreground/70 max-w-md">
            Create your staff account to access the property management system.
          </p>
        </div>

        <div className="text-xs text-sidebar-foreground/60">
          © {new Date().getFullYear()} LuxuryStay Hospitality
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          <div className="flex items-center gap-2 text-primary mb-6">
            <Hotel className="w-6 h-6" />
            <span className="font-display text-xl">Create account</span>
          </div>

          <h1 className="font-display text-3xl text-foreground">
            Staff Registration
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            Set up your access to the HMS.
          </p>

          {alertMessage && (
            <p className="mt-3 text-red-500 text-sm">{alertMessage}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mt-6 space-y-4">

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
                className="w-full h-10 px-3 rounded-md border bg-card text-sm"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full h-10 px-3 rounded-md border bg-card text-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}

              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full h-10 px-3 rounded-md border bg-card text-sm"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}

            </div>

            <button
              type="submit"
              className="mt-6 w-full h-10 rounded-md bg-primary text-primary-foreground font-medium inline-flex items-center justify-center gap-2 hover:bg-primary/90"
            >
              <UserPlus className="w-4 h-4" />
              Create account
            </button>

            <p className="mt-4 text-sm text-muted-foreground text-center">
              Already registered?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </form>

        </div>
      </div>
    </div>
  );
}