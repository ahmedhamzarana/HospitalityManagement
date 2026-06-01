import { AppLayout, StatusPill } from "../components/AppLayout.jsx";
import { store, useStore } from "../lib/store.js";

export default function CheckIn() {
  const reservations = useStore((s) => s.reservations);
  const rooms = useStore((s) => s.rooms);
  const guests = useStore((s) => s.guests);

  const arrivals = reservations.filter((r) => r.status === "confirmed");
  const departures = reservations.filter((r) => r.status === "checked-in");

  const renderRow = (r, action) => {
    const g = guests.find((x) => x.id === r.guestId);
    const room = rooms.find((x) => x.id === r.roomId);
    return (
      <div key={r.id} className="flex items-center justify-between border-t py-3 first:border-0">
        <div>
          <div className="font-medium">{g?.name} {g?.vip && <span className="text-gold text-xs ml-1">VIP</span>}</div>
          <div className="text-xs text-muted-foreground">Room #{room?.number} · {room?.type} · {r.checkIn} → {r.checkOut}</div>
        </div>
        <div className="flex items-center gap-3">
          <StatusPill status={r.status} />
          <button
            onClick={() => {
              if (action === "in") {
                store.setReservationStatus(r.id, "checked-in");
                if (room) store.updateRoomStatus(room.id, "occupied");
              } else {
                store.setReservationStatus(r.id, "checked-out");
                if (room) store.updateRoomStatus(room.id, "cleaning");
              }
            }}
            className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:opacity-90"
          >
            {action === "in" ? "Check in & assign key" : "Check out & bill"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <AppLayout title="Check-in / Check-out" subtitle="Smooth arrivals and departures.">
      <div className="grid lg:grid-cols-2 gap-5">
        <section className="card-elevated p-5">
          <h2 className="font-display text-lg mb-3">Today's arrivals <span className="text-muted-foreground text-sm">({arrivals.length})</span></h2>
          {arrivals.length === 0 && <p className="text-sm text-muted-foreground">No pending arrivals.</p>}
          {arrivals.map((r) => renderRow(r, "in"))}
        </section>
        <section className="card-elevated p-5">
          <h2 className="font-display text-lg mb-3">Departures <span className="text-muted-foreground text-sm">({departures.length})</span></h2>
          {departures.length === 0 && <p className="text-sm text-muted-foreground">No active stays.</p>}
          {departures.map((r) => renderRow(r, "out"))}
        </section>
      </div>
    </AppLayout>
  );
}
