import { AppLayout } from "../components/AppLayout.jsx";
import { fmtMoney, useStore } from "../lib/store.js";

export default function Reports() {
  const rooms = useStore((s) => s.rooms);
  const reservations = useStore((s) => s.reservations);
  const feedback = useStore((s) => s.feedback);

  const revenueByType = rooms.reduce((acc, r) => {
    const ress = reservations.filter((x) => x.roomId === r.id && x.status !== "cancelled");
    acc[r.type] = (acc[r.type] ?? 0) + ress.reduce((s, x) => s + x.total, 0);
    return acc;
  }, {});
  const maxRev = Math.max(...Object.values(revenueByType), 1);

  const statusCounts = rooms.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] ?? 0) + 1;
    return acc;
  }, {});

  const ratingCounts = [5, 4, 3, 2, 1].map((r) => ({ r, c: feedback.filter((f) => f.rating === r).length }));

  return (
    <AppLayout title="Reports & Analytics" subtitle="Snapshot for leadership review.">
      <div className="grid lg:grid-cols-2 gap-5">
        <section className="card-elevated p-6">
          <h2 className="font-display text-lg mb-4">Revenue by room type</h2>
          <ul className="space-y-3">
            {Object.entries(revenueByType).map(([type, val]) => (
              <li key={type}>
                <div className="flex justify-between text-sm">
                  <span>{type}</span>
                  <span className="font-medium">{fmtMoney(val)}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: `${(val / maxRev) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="card-elevated p-6">
          <h2 className="font-display text-lg mb-4">Room status mix</h2>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(statusCounts).map(([s, c]) => (
              <div key={s} className="bg-secondary rounded-md p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s}</div>
                <div className="stat-number mt-1">{c}</div>
                <div className="text-xs text-muted-foreground">{Math.round((c / rooms.length) * 100)}% of inventory</div>
              </div>
            ))}
          </div>
        </section>

        <section className="card-elevated p-6">
          <h2 className="font-display text-lg mb-4">Guest satisfaction</h2>
          <div className="space-y-2">
            {ratingCounts.map(({ r, c }) => (
              <div key={r} className="flex items-center gap-3 text-sm">
                <span className="w-8 text-muted-foreground">{r}★</span>
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-gold" style={{ width: `${(c / Math.max(feedback.length, 1)) * 100}%` }} />
                </div>
                <span className="w-6 text-right text-muted-foreground">{c}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card-elevated p-6">
          <h2 className="font-display text-lg mb-4">Booking pipeline</h2>
          <div className="grid grid-cols-2 gap-3">
            {["confirmed", "checked-in", "checked-out", "cancelled"].map((s) => {
              const c = reservations.filter((r) => r.status === s).length;
              return (
                <div key={s} className="bg-secondary rounded-md p-4">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground capitalize">{s}</div>
                  <div className="stat-number mt-1">{c}</div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
