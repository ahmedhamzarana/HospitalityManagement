import { useState } from "react";
import { AppLayout, StatusPill } from "../components/AppLayout.jsx";
import { fmtMoney, store, useStore } from "../lib/store.js";

const STATUSES = ["available", "occupied", "cleaning", "maintenance"];

export default function Rooms() {
  const rooms = useStore((s) => s.rooms);
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? rooms : rooms.filter((r) => r.status === filter);

  return (
    <AppLayout title="Rooms" subtitle="Live inventory across 5 floors and 40 rooms.">
      <div className="flex items-center gap-2 mb-5">
        {["all", ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-md text-sm capitalize border transition-colors ${
              filter === s ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-muted"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-3">
        {list.map((r) => (
          <div key={r.id} className="card-elevated p-4 hover:-translate-y-0.5 transition-transform">
            <div className="flex items-start justify-between">
              <div className="font-display text-2xl text-primary">#{r.number}</div>
              <StatusPill status={r.status} />
            </div>
            <div className="text-xs text-muted-foreground mt-1">Floor {r.floor} · {r.capacity} guests</div>
            <div className="text-sm font-medium mt-2">{r.type}</div>
            <div className="text-sm text-accent font-semibold mt-1">{fmtMoney(r.rate)}/night</div>
            <select
              value={r.status}
              onChange={(e) => store.updateRoomStatus(r.id, e.target.value)}
              className="mt-3 w-full text-xs bg-secondary border border-border rounded-md px-2 py-1.5"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s} className="capitalize">{s}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
