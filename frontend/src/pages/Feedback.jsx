import { Star } from "lucide-react";
import { AppLayout } from "../components/AppLayout.jsx";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function Feedback() {
  const token = localStorage.getItem("token");

  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({ rating: 5, comment: "" });
  const [alert, setAlert] = useState({ message: "", type: "" });

  // ✅ FETCH FEEDBACK (stable function)
  const fetchFeedback = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/feedback/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFeedbacks(res.data.feedbacks);
    } catch (err) {
      setAlert({
        message: "Failed to load feedback",
        type: "error",
      });
    }
  }, [token]);

  // run once
  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  // auto hide alert
  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  // submit feedback
  const submitFeedback = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/feedback/create",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setForm({ rating: 5, comment: "" });

      setAlert({
        message: "Feedback submitted successfully",
        type: "success",
      });

      fetchFeedback();
    } catch (err) {
      setAlert({
        message:
          err.response?.data?.message || "Error submitting feedback",
        type: "error",
      });
    }
  };

  return (
    <AppLayout
      title="Guest Feedback"
      subtitle={`Total reviews: ${feedbacks.length}`}
    >
      {/* ALERT */}
      {alert.message && (
        <div
          className={`mb-4 flex items-center gap-2 p-3 text-sm rounded-md border-l-4 shadow-sm
          ${
            alert.type === "success"
              ? "bg-green-50 border-green-500 text-green-700"
              : "bg-red-50 border-red-500 text-red-700"
          }`}
        >
          <span className="text-lg">
            {alert.type === "success" ? "✓" : "✕"}
          </span>
          <span>{alert.message}</span>
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_360px] gap-5">
        {/* LIST */}
        <div className="space-y-3">
          {feedbacks.map((f) => (
            <article key={f._id} className="card-elevated p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">
                    {f.user?.name || "Unknown User"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(f.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      className={`w-4 h-4 ${
                        n <= f.rating
                          ? "fill-gold text-gold"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-sm mt-2 text-foreground/80">
                {f.comment}
              </p>
            </article>
          ))}
        </div>

        {/* FORM */}
        <div className="card-elevated p-5 h-fit space-y-3">
          <h2 className="font-display text-lg">Capture feedback</h2>

          {/* RATING */}
          <div className="text-sm">
            Rating
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  onClick={() =>
                    setForm((prev) => ({ ...prev, rating: n }))
                  }
                  className={`w-6 h-6 cursor-pointer ${
                    n <= form.rating
                      ? "fill-gold text-gold"
                      : "text-muted-foreground/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* COMMENT */}
          <label className="block text-sm">
            Comment
            <textarea
              rows={4}
              value={form.comment}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  comment: e.target.value,
                }))
              }
              className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
            />
          </label>

          <button
            onClick={submitFeedback}
            className="w-full px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </AppLayout>
  );
}