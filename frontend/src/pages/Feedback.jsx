import { Star } from "lucide-react";
import { AppLayout } from "../components/AppLayout.jsx";

export default function Feedback() {

  return (
    <AppLayout
      title="Guest Feedback"
      subtitle="Average rating 4.6★ across 3 reviews"
    >

      <div className="grid lg:grid-cols-[1fr_360px] gap-5">

        {/* FEEDBACK LIST (STATIC) */}
        <div className="space-y-3">

          <article className="card-elevated p-5">
            <div className="flex items-start justify-between">

              <div>
                <div className="font-medium">John Smith</div>
                <div className="text-xs text-muted-foreground">2026-05-12</div>
              </div>

              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((n) => (
                  <Star
                    key={n}
                    className={`w-4 h-4 ${n <= 5 ? "fill-gold text-gold" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>

            </div>

            <p className="text-sm mt-2 text-foreground/80">
              "Amazing stay, very clean rooms and great service."
            </p>
          </article>

          <article className="card-elevated p-5">
            <div className="flex items-start justify-between">

              <div>
                <div className="font-medium">Sarah Khan</div>
                <div className="text-xs text-muted-foreground">2026-05-10</div>
              </div>

              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((n) => (
                  <Star
                    key={n}
                    className={`w-4 h-4 ${n <= 4 ? "fill-gold text-gold" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>

            </div>

            <p className="text-sm mt-2 text-foreground/80">
              "Good experience but room service was a bit slow."
            </p>
          </article>

        </div>

        {/* STATIC FORM UI (NO LOGIC) */}
        <div className="card-elevated p-5 h-fit space-y-3">

          <h2 className="font-display text-lg">Capture feedback</h2>

          {/* GUEST */}
          <label className="block text-sm">
            Guest
            <select className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2">
              <option>John Smith</option>
              <option>Sarah Khan</option>
              <option>Ali Ahmed</option>
            </select>
          </label>

          {/* RATING */}
          <div className="text-sm">
            Rating
            <div className="flex gap-1 mt-1">
              {[1,2,3,4,5].map((n) => (
                <Star
                  key={n}
                  className={`w-6 h-6 ${n <= 4 ? "fill-gold text-gold" : "text-muted-foreground/40"}`}
                />
              ))}
            </div>
          </div>

          {/* COMMENT */}
          <label className="block text-sm">
            Comment
            <textarea
              rows={4}
              className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
              defaultValue="Great experience overall"
            />
          </label>

          {/* BUTTON */}
          <button className="w-full px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md">
            Submit
          </button>

        </div>

      </div>

    </AppLayout>
  );
}