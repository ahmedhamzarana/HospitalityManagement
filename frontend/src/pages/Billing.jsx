import { useState } from "react";
import { Printer } from "lucide-react";
import { AppLayout } from "../components/AppLayout.jsx";
import { fmtMoney, store, useStore } from "../lib/store.js";

export default function Billing() {
  const invoices = useStore((s) => s.invoices);
  const reservations = useStore((s) => s.reservations);
  const guests = useStore((s) => s.guests);
  const rooms = useStore((s) => s.rooms);
  const [active, setActive] = useState(invoices[0]?.id ?? null);

  const current = invoices.find((i) => i.id === active);
  const res = current ? reservations.find((r) => r.id === current.reservationId) : null;
  const guest = res ? guests.find((g) => g.id === res.guestId) : null;
  const room = res ? rooms.find((r) => r.id === res.roomId) : null;
  const subtotal = current ? current.items.reduce((s, i) => s + i.amount, 0) : 0;

  return (
    <AppLayout title="Billing & Invoicing" subtitle="Issue, print, and settle stay invoices.">
      <div className="grid lg:grid-cols-[280px_1fr] gap-5">
        <aside className="card-elevated p-3 max-h-[70vh] overflow-y-auto">
          {invoices.map((i) => {
            const r = reservations.find((x) => x.id === i.reservationId);
            const g = guests.find((x) => x.id === r?.guestId);
            return (
              <button
                key={i.id}
                onClick={() => setActive(i.id)}
                className={`w-full text-left p-3 rounded-md mb-1 ${active === i.id ? "bg-secondary" : "hover:bg-muted"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm">{g?.name}</div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${i.paid ? "bg-success/15 text-success" : "bg-warning/20 text-warning-foreground"}`}>
                    {i.paid ? "PAID" : "OPEN"}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{fmtMoney(i.total)} · {i.issued}</div>
              </button>
            );
          })}
        </aside>

        {current && res && guest && room ? (
          <article className="card-elevated p-8">
            <header className="flex items-start justify-between border-b pb-6">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-gold">LuxuryStay</div>
                <h2 className="font-display text-2xl mt-1">Invoice</h2>
                <div className="text-xs text-muted-foreground mt-1">#{current.id.toUpperCase()} · Issued {current.issued}</div>
              </div>
              <div className="text-right text-sm">
                <div className="font-medium">{guest.name}</div>
                <div className="text-muted-foreground">{guest.email}</div>
                <div className="text-muted-foreground">{guest.phone}</div>
              </div>
            </header>

            <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Room</div>
                <div>#{room.number} · {room.type}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Stay</div>
                <div>{res.checkIn} → {res.checkOut}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Status</div>
                <div className="capitalize">{res.status}</div>
              </div>
            </div>

            <table className="w-full mt-6 text-sm">
              <thead className="text-xs text-muted-foreground border-b">
                <tr className="text-left">
                  <th className="py-2 font-medium">Description</th>
                  <th className="py-2 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {current.items.map((it, idx) => (
                  <tr key={idx} className="border-b last:border-0">
                    <td className="py-3">{it.label}</td>
                    <td className="py-3 text-right">{fmtMoney(it.amount)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="text-sm">
                <tr>
                  <td className="pt-3 text-right text-muted-foreground">Subtotal</td>
                  <td className="pt-3 text-right">{fmtMoney(subtotal)}</td>
                </tr>
                <tr>
                  <td className="py-1 text-right text-muted-foreground">Tax (12%)</td>
                  <td className="py-1 text-right">{fmtMoney(current.tax)}</td>
                </tr>
                <tr className="font-display text-lg">
                  <td className="pt-2 text-right">Total</td>
                  <td className="pt-2 text-right text-primary">{fmtMoney(current.total)}</td>
                </tr>
              </tfoot>
            </table>

            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 text-sm border rounded-md hover:bg-muted">
                <Printer className="w-4 h-4" /> Print
              </button>
              {!current.paid && (
                <button onClick={() => store.markInvoicePaid(current.id)} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:opacity-90">
                  Mark paid
                </button>
              )}
            </div>
          </article>
        ) : (
          <div className="card-elevated p-8 text-muted-foreground text-sm">Select an invoice.</div>
        )}
      </div>
    </AppLayout>
  );
}
