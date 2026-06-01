import { useState } from "react";
import { Star } from "lucide-react";
import { AppLayout } from "../components/AppLayout.jsx";
import { store, useStore } from "../lib/store.js";

export default function Feedback() {
  const feedback = useStore((s) => s.feedback);
  const guests = useStore((s) => s.guests);
  const [guestId, setGuestId] = useState(guests[0]?.id ?? "");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    store.addFeedback({ guestId, rating, comment: comment.trim() });
    setComment("");
  };

  const avg = (feedback.reduce((s, f) => s + f.rating, 0) / feedback.length).toFixed(2);

  return (
    <AppLayout title="Guest Feedback" subtitle={`Average rating ${avg}★ across ${feedback.length} reviews`}>
      <div className="grid lg:grid-cols-[1fr_360px] gap-5">
        <div className="space-y-3">
          {feedback.map((f) => {
            const g = guests.find((x) => x.id === f.guestId);
            return (
              <article key={f.id} className="card-elevated p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{g?.name ?? "Anonymous"}</div>
                    <div className="text-xs text-muted-foreground">{f.date}</div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < f.rating ? "fill-gold text-gold" : "text-muted-foreground/30"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm mt-2 text-foreground/80">"{f.comment}"</p>
              </article>
            );
          })}
        </div>

        <form onSubmit={submit} className="card-elevated p-5 h-fit space-y-3">
          <h2 className="font-display text-lg">Capture feedback</h2>
          <label className="block text-sm">Guest
            <select value={guestId} onChange={(e) => setGuestId(e.target.value)} className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2">
              {guests.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </label>
          <div className="text-sm">
            Rating
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button type="button" key={n} onClick={() => setRating(n)}>
                  <Star className={`w-6 h-6 ${n <= rating ? "fill-gold text-gold" : "text-muted-foreground/40"}`} />
                </button>
              ))}
            </div>
          </div>
          <label className="block text-sm">Comment
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={4} maxLength={500} required className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2" />
          </label>
          <button className="w-full px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md">Submit</button>
        </form>
      </div>
    </AppLayout>
  );
}
