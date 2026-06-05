import { Hotel, UserPlus } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear field error when user types
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({});
    setAlert({ type: "", message: "" });

    setLoading(true);

    axios
      .post("http://localhost:5000/api/auth/register", formData)
      .then((response) => {
        setAlert({
          type: "success",
          message: "Account created successfully!",
        });

        // reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        const backendErrors = error.response?.data?.errors;

        if (backendErrors) {
          setErrors(backendErrors);

          const message =
            Object.values(backendErrors)[0] || "Invalid credentials";

          setAlert({
            type: "error",
            message,
          });

          // auto hide after 3 seconds
          setTimeout(() => {
            setAlert({ type: "", message: "" });
          }, 3000);

        } else {
          setAlert({
            type: "error",
            message: "Something went wrong. Please try again later.",
          });

          setTimeout(() => {
            setAlert({ type: "", message: "" });
          }, 3000);
        }
      })
      .finally(() => {
        setLoading(false);
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
            Create your account to access HMS.
          </p>
        </div>

        <div className="text-xs text-sidebar-foreground/60">
          © {new Date().getFullYear()} LuxuryStay
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
            Registration
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            Set up your access to HMS.
          </p>

          {/* ALERT */}
          {alert.message && (
            <div
              className={`mt-4 p-3 rounded-md text-sm font-medium border
              ${alert.type === "error"
                  ? "bg-red-50 text-red-700 border-red-200"
                  : "bg-green-50 text-green-700 border-green-200"
                }`}
            >
              {alert.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mt-6 space-y-4">

              <div>
                <label className="text-sm font-medium">Name</label>

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full h-10 px-3 rounded-md border bg-card text-sm"
                />
                {errors.name && (
                  <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>

                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full h-10 px-3 rounded-md border bg-card text-sm"
                />
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Phone</label>

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full h-10 px-3 rounded-md border bg-card text-sm"
                />
                {errors.phone && (
                  <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Password</label>

                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full h-10 px-3 rounded-md border bg-card text-sm"
                />
                {errors.password && (
                  <p className="text-xs text-red-600 mt-1">{errors.password}</p>
                )}
              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full h-10 rounded-md bg-primary text-primary-foreground font-medium inline-flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-60"
            >
              <UserPlus className="w-4 h-4" />
              {loading ? "Creating account..." : "Create account"}
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