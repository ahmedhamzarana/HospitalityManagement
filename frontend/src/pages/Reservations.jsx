import { useState } from "react";
import { Plus } from "lucide-react";
import { AppLayout, StatusPill } from "../components/AppLayout.jsx";
const fmtMoney = (n) => `$${n}`;

export default function Reservations() {
  const [open, setOpen] = useState(false);

  const reservations = [
    {
      id: 1,
      guest: "John Smith",
      room: "#101 · Deluxe",
      checkIn: "2026-06-10",
      checkOut: "2026-06-12",
      status: "confirmed",
      total: 450,
    },
    {
      id: 2,
      guest: "Sarah Khan",
      room: "#202 · Suite",
      checkIn: "2026-06-11",
      checkOut: "2026-06-14",
      status: "checked-in",
      total: 980,
    },
    {
      id: 3,
      guest: "Ali Ahmed",
      room: "#305 · Standard",
      checkIn: "2026-06-09",
      checkOut: "2026-06-11",
      status: "checked-out",
      total: 320,
    },
  ];

  return (
    <AppLayout title="Reservations" subtitle="All bookings, latest first.">

      {/* BUTTON */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> New reservation
        </button>
      </div>

      {/* TABLE */}
      <div className="card-elevated overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
            <tr className="text-left">
              <th className="px-4 py-3">Guest</th>
              <th className="px-4 py-3">Room</th>
              <th className="px-4 py-3">Check-in</th>
              <th className="px-4 py-3">Check-out</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>

          <tbody>
            {reservations.map((r) => (
              <tr key={r.id} className="border-t hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">{r.guest}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.room}</td>
                <td className="px-4 py-3">{r.checkIn}</td>
                <td className="px-4 py-3">{r.checkOut}</td>
                <td className="px-4 py-3">
                  <StatusPill status={r.status} />
                </td>
                <td className="px-4 py-3 text-right font-medium">
                  {fmtMoney(r.total)}
                </td>
                <td className="px-4 py-3 text-right">
                  {r.status === "confirmed" && (
                    <span className="text-xs text-accent">Check in</span>
                  )}
                  {r.status === "checked-in" && (
                    <span className="text-xs text-accent">Check out</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL (ONLY WHEN OPEN) */}
      {open && (
        <div
          className="fixed inset-0 bg-primary/40 grid place-items-center p-4 z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="card-elevated w-full max-w-md p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-xl">New reservation</h2>

            <label className="block text-sm">
              Guest
              <select className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2">
                <option>John Smith</option>
                <option>Sarah Khan</option>
                <option>Ali Ahmed</option>
              </select>
            </label>

            <label className="block text-sm">
              Room
              <select className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2">
                <option>#101 · Deluxe · $120/night</option>
                <option>#202 · Suite · $180/night</option>
                <option>#305 · Standard · $90/night</option>
              </select>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm">
                Check-in
                <input
                  type="date"
                  className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
                />
              </label>

              <label className="block text-sm">
                Check-out
                <input
                  type="date"
                  className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
                />
              </label>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm hover:bg-muted rounded-md"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}