import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { AppLayout, StatusPill } from "../components/AppLayout.jsx";
import { fmtMoney, store, useStore } from "../lib/store.js";

export default function Reservations() {
  const reservations = useStore((s) => s.reservations);
  const rooms = useStore((s) => s.rooms);
  const guests = useStore((s) => s.guests);
  const [open, setOpen] = useState(false);
  const [guestId, setGuestId] = useState(guests[0]?.id ?? "");
  const [roomId, setRoomId] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const available = useMemo(() => rooms.filter((r) => r.status === "available"), [rooms]);

  const submit = (e) => {
    e.preventDefault();
    const room = rooms.find((r) => r.id === roomId);
    if (!room || !checkIn || !checkOut) return;
    const nights = Math.max(1, Math.round((+new Date(checkOut) - +new Date(checkIn)) / 86400000));
    store.addReservation({ guestId, roomId, checkIn, checkOut, status: "confirmed", total: nights * room.rate });
    setOpen(false);
    setRoomId(""); setCheckIn(""); setCheckOut("");
  };

  return (
    <AppLayout title="Reservations" subtitle="All bookings, latest first.">
      <div className="flex justify-end mb-4">
        <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:opacity-90">
          <Plus className="w-4 h-4" /> New reservation
        </button>
      </div>

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
            {reservations.map((r) => {
              const g = guests.find((x) => x.id === r.guestId);
              const room = rooms.find((x) => x.id === r.roomId);
              return (
                <tr key={r.id} className="border-t hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{g?.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">#{room?.number} · {room?.type}</td>
                  <td className="px-4 py-3">{r.checkIn}</td>
                  <td className="px-4 py-3">{r.checkOut}</td>
                  <td className="px-4 py-3"><StatusPill status={r.status} /></td>
                  <td className="px-4 py-3 text-right font-medium">{fmtMoney(r.total)}</td>
                  <td className="px-4 py-3 text-right">
                    {r.status === "confirmed" && (
                      <button onClick={() => store.setReservationStatus(r.id, "checked-in")} className="text-xs text-accent hover:underline">Check in</button>
                    )}
                    {r.status === "checked-in" && (
                      <button onClick={() => store.setReservationStatus(r.id, "checked-out")} className="text-xs text-accent hover:underline">Check out</button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 bg-primary/40 grid place-items-center p-4 z-50" onClick={() => setOpen(false)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={submit} className="card-elevated w-full max-w-md p-6 space-y-4">
            <h2 className="font-display text-xl">New reservation</h2>
            <label className="block text-sm">
              Guest
              <select value={guestId} onChange={(e) => setGuestId(e.target.value)} className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2">
                {guests.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
              </select>
            </label>
            <label className="block text-sm">
              Room
              <select value={roomId} onChange={(e) => setRoomId(e.target.value)} required className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2">
                <option value="">Select available room…</option>
                {available.map((r) => <option key={r.id} value={r.id}>#{r.number} · {r.type} · {fmtMoney(r.rate)}/night</option>)}
              </select>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm">Check-in
                <input type="date" required value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2" />
              </label>
              <label className="block text-sm">Check-out
                <input type="date" required value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2" />
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm hover:bg-muted rounded-md">Cancel</button>
              <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md">Confirm</button>
            </div>
          </form>
        </div>
      )}
    </AppLayout>
  );
}
