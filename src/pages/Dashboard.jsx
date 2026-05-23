import { Link } from "react-router-dom";
import { AppLayout, StatusPill } from "../components/AppLayout.jsx";
import { fmtMoney, useStore } from "../lib/store.js";
import { ArrowUpRight, BedDouble, CalendarCheck, DollarSign, Sparkles, Star, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const rooms = useStore((s) => s.rooms);
  const reservations = useStore((s) => s.reservations);
  const tasks = useStore((s) => s.tasks);
  const feedback = useStore((s) => s.feedback);
  const guests = useStore((s) => s.guests);

  const occupied = rooms.filter((r) => r.status === "occupied").length;
  const occupancy = Math.round((occupied / rooms.length) * 100);
  const arrivals = reservations.filter((r) => r.status === "confirmed").length;
  const revenue = reservations.reduce((s, r) => s + (r.status !== "cancelled" ? r.total : 0), 0);
  const avgRating = (feedback.reduce((s, f) => s + f.rating, 0) / feedback.length).toFixed(1);

  const stats = [
    { label: "Occupancy", value: `${occupancy}%`, icon: BedDouble, hint: `${occupied} / ${rooms.length} rooms` },
    { label: "Arrivals", value: arrivals, icon: CalendarCheck, hint: "Confirmed bookings" },
    { label: "Revenue (period)", value: fmtMoney(revenue), icon: DollarSign, hint: "Across all reservations" },
    { label: "Guest rating", value: `${avgRating}★`, icon: Star, hint: `${feedback.length} reviews` },
  ];

  const todayList = reservations.slice(0, 5);
  const openTasks = tasks.filter((t) => t.status !== "done").slice(0, 5);

  return (
    <AppLayout title="Welcome back, Alex" subtitle="Here's what's happening across LuxuryStay today.">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card-elevated p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                  <div className="stat-number mt-2">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.hint}</div>
                </div>
                <div className="w-10 h-10 rounded-md bg-secondary text-primary grid place-items-center">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <div className="card-elevated p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display">Recent reservations</h2>
            <Link to="/reservations" className="text-xs text-accent inline-flex items-center gap-1 hover:underline">
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground border-b">
              <tr className="text-left">
                <th className="py-2 font-medium">Guest</th>
                <th className="py-2 font-medium">Room</th>
                <th className="py-2 font-medium">Dates</th>
                <th className="py-2 font-medium">Status</th>
                <th className="py-2 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {todayList.map((r) => {
                const g = guests.find((x) => x.id === r.guestId);
                const room = rooms.find((x) => x.id === r.roomId);
                return (
                  <tr key={r.id} className="border-b last:border-0">
                    <td className="py-3">{g?.name}</td>
                    <td className="py-3 text-muted-foreground">#{room?.number} · {room?.type}</td>
                    <td className="py-3 text-muted-foreground">{r.checkIn} → {r.checkOut}</td>
                    <td className="py-3"><StatusPill status={r.status} /></td>
                    <td className="py-3 text-right font-medium">{fmtMoney(r.total)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="card-elevated p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display">Housekeeping queue</h2>
            <Sparkles className="w-4 h-4 text-gold" />
          </div>
          <ul className="space-y-3">
            {openTasks.map((t) => {
              const room = rooms.find((r) => r.id === t.roomId);
              return (
                <li key={t.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-secondary text-primary grid place-items-center text-xs font-semibold">
                    {room?.number}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm capitalize">{t.type}</div>
                    <div className="text-xs text-muted-foreground">{t.assignee}{t.note ? ` · ${t.note}` : ""}</div>
                  </div>
                  <StatusPill status={t.status} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="card-elevated p-5 mt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-display">Occupancy this week</h2>
            <p className="text-xs text-muted-foreground">Forecasted trend based on confirmed bookings</p>
          </div>
          <div className="inline-flex items-center gap-1 text-success text-sm">
            <TrendingUp className="w-4 h-4" /> +12.4%
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 h-40 items-end">
          {[58, 62, 71, 78, 84, 92, 88].map((v, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-primary to-accent"
                style={{ height: `${v}%` }}
                aria-label={`${v}% occupancy`}
              />
              <div className="text-xs text-muted-foreground">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}</div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
