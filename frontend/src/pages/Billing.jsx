import { useEffect, useState } from "react";
import { Printer } from "lucide-react";
import axios from "axios";
import { AppLayout } from "../components/AppLayout.jsx";

export default function Billing() {
  const [active, setActive] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fetchInvoices = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("http://localhost:5000/api/invoices/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInvoices(data.invoices || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const markAsPaid = async (invoiceId) => {
    try {
      await axios.patch(`http://localhost:5000/api/invoices/${invoiceId}/pay`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setInvoices((prev) =>
        prev.map((invoice) =>
          invoice._id === invoiceId
            ? { ...invoice, status: "PAID" }
            : invoice
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const current = invoices.find((i) => i._id === active);

  return (
    <AppLayout
      title="Billing & Invoicing"
      subtitle="Click invoice to view"
    >
      {/* TABLE */}
      <div className="card-elevated overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Guest</th>
              <th className="px-4 py-3 text-left">Room</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-muted-foreground"
                >
                  Loading invoices...
                </td>
              </tr>
            ) : invoices.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-muted-foreground"
                >
                  No invoices found
                </td>
              </tr>
            ) : (
              invoices.map((i) => (
                <tr
                  key={i._id}
                  className="border-t hover:bg-muted/30 cursor-pointer"
                >
                  <td className="px-4 py-3 font-medium">
                    {i.guest?.name}
                  </td>

                  <td className="px-4 py-3 text-muted-foreground">
                    #{i.room?.roomId} · {i.room?.category}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${i.status === "PAID"
                          ? "bg-green-500/20 text-green-600"
                          : "bg-yellow-500/20 text-yellow-600"
                        }`}
                    >
                      {i.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right font-medium">
                    ${i.totalAmount}
                  </td>
                  <td className="px-4 py-3 text-right">

                    <button
                      onClick={() => setActive(i._id)}
                      className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md"
                    >
                      GET INVOICE
                    </button>
                  </td>
                </tr>
              ))
            )}
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

                <h2 className="font-display text-2xl">
                  Invoice
                </h2>

                <div className="text-xs text-muted-foreground">
                  #{current._id}
                </div>
              </div>

              <div className="text-right text-sm">
                <div className="font-medium">
                  {current.guest?.name}
                </div>

                <div className="text-muted-foreground">
                  {current.guest?.email}
                </div>

                <div className="text-muted-foreground">
                  {current.guest?.phone}
                </div>
              </div>
            </div>

            {/* INFO */}
            <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">
                  Room
                </div>

                <div>
                  #{current.room?.roomId} ·{" "}
                  {current.room?.category}
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground">
                  Stay
                </div>

                <div>
                  {new Date(
                    current.reservation?.checkIn
                  ).toLocaleDateString()}
                  {" → "}
                  {new Date(
                    current.reservation?.checkOut
                  ).toLocaleDateString()}
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground">
                  Status
                </div>

                <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${current.status === "PAID"
                          ? "bg-green-500/20 text-green-600"
                          : "bg-yellow-500/20 text-yellow-600"
                        }`}
                    >
                      {current.status}
                    </span>
              </div>
            </div>

            {/* ITEMS */}
            <table className="w-full mt-6 text-sm">
              <tbody>
                {current.items?.length > 0 ? (
                  current.items.map((it, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2">{it.label}</td>
                      <td className="py-2 text-right">
                        ${it.amount}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b">
                    <td className="py-2">Room Charges</td>
                    <td className="py-2 text-right">
                      ${current.totalAmount}
                    </td>
                  </tr>
                )}

                <tr className="font-semibold">
                  <td className="py-3">Total</td>
                  <td className="py-3 text-right">
                    ${current.totalAmount}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ACTIONS */}
            <div className="flex justify-end gap-2 mt-6">
{role !== "guest" ? (
  current.status === "UNPAID" ? (
    <button
      onClick={() => markAsPaid(current._id)}
      className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md"
    >
      Mark as Paid
    </button>
  ) : (
    <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md">
      Paid
    </button>
  )
) : null}
         
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