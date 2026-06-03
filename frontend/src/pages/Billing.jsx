import { useState } from "react";
import { Printer } from "lucide-react";
import { AppLayout } from "../components/AppLayout.jsx";

export default function Billing() {
  const [active, setActive] = useState(null);

  const invoices = [
    {
      id: "inv-001",
      guest: "John Smith",
      email: "john@example.com",
      phone: "+92 300 1234567",
      room: "#101 · Deluxe",
      checkIn: "2026-01-10",
      checkOut: "2026-01-12",
      status: "PAID",
      total: "$450.00",
      items: [
        { label: "Room Charges", amount: "$400.00" },
        { label: "Service Fee", amount: "$50.00" },
      ],
    },
    {
      id: "inv-002",
      guest: "Sarah Khan",
      email: "sarah@example.com",
      phone: "+92 301 9876543",
      room: "#205 · Suite",
      checkIn: "2026-01-12",
      checkOut: "2026-01-15",
      status: "OPEN",
      total: "$780.00",
      items: [
        { label: "Room Charges", amount: "$700.00" },
        { label: "Tax", amount: "$80.00" },
      ],
    },
  ];

  const current = invoices.find((i) => i.id === active);

  return (
    <AppLayout title="Billing & Invoicing" subtitle="Click invoice to view">

      {/* TABLE */}
      <div className="card-elevated overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-secondary text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Guest</th>
              <th className="px-4 py-3 text-left">Room</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((i) => (
              <tr
                key={i.id}
                onClick={() => setActive(i.id)}
                className="border-t hover:bg-muted/30 cursor-pointer"
              >
                <td className="px-4 py-3 font-medium">{i.guest}</td>
                <td className="px-4 py-3 text-muted-foreground">{i.room}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      i.status === "PAID"
                        ? "bg-green-500/20 text-green-600"
                        : "bg-yellow-500/20 text-yellow-600"
                    }`}
                  >
                    {i.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-medium">{i.total}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* MODAL */}
      {active && current && (
        <div
          className="fixed inset-0 bg-primary/40 grid place-items-center p-4 z-50"
          onClick={() => setActive(null)}
        >
          <div
            className="card-elevated w-full max-w-2xl p-8"
            onClick={(e) => e.stopPropagation()}
          >

            {/* HEADER */}
            <div className="flex justify-between border-b pb-4">
              <div>
                <div className="text-xs uppercase text-gold tracking-widest">
                  LuxuryStay
                </div>
                <h2 className="font-display text-2xl">Invoice</h2>
                <div className="text-xs text-muted-foreground">
                  #{current.id}
                </div>
              </div>

              <div className="text-right text-sm">
                <div className="font-medium">{current.guest}</div>
                <div className="text-muted-foreground">{current.email}</div>
                <div className="text-muted-foreground">{current.phone}</div>
              </div>
            </div>

            {/* INFO */}
            <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Room</div>
                <div>{current.room}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Stay</div>
                <div>{current.checkIn} → {current.checkOut}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Status</div>
                <div>{current.status}</div>
              </div>
            </div>

            {/* ITEMS */}
            <table className="w-full mt-6 text-sm">
              <tbody>
                {current.items.map((it, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2">{it.label}</td>
                    <td className="py-2 text-right">{it.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ACTIONS */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm border rounded-md hover:bg-muted"
              >
                <Printer className="w-4 h-4" />
                Print / PDF
              </button>

              <button
                onClick={() => setActive(null)}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </AppLayout>
  );
}