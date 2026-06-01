import { useState } from "react";
import { AppLayout } from "../components/AppLayout.jsx";
import { store, useStore } from "../lib/store.js";

export default function Settings() {
  const settings = useStore((s) => s.settings);
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    store.updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppLayout title="System Settings" subtitle="Admin controls for hotel-wide configuration.">
      <form onSubmit={submit} className="card-elevated p-6 max-w-2xl space-y-5">
        <div>
          <h2 className="font-display text-lg">Property</h2>
          <p className="text-xs text-muted-foreground">Branding shown across the system.</p>
        </div>
        <label className="block text-sm">Hotel name
          <input value={form.hotelName} onChange={(e) => setForm({ ...form, hotelName: e.target.value })} className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2" />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="block text-sm">Tax rate (%)
            <input type="number" min={0} max={50} value={form.taxRate} onChange={(e) => setForm({ ...form, taxRate: Number(e.target.value) })} className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2" />
          </label>
          <label className="block text-sm">Currency
            <select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2">
              {["USD", "EUR", "GBP", "INR", "JPY", "AED"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
        </div>

        <div className="border-t pt-5">
          <h2 className="font-display text-lg">Policies</h2>
          <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2 space-y-1">
            <li>Standard check-in 3:00 PM · check-out 11:00 AM.</li>
            <li>Late cancellations (under 24h) incur one night charge.</li>
            <li>Smoking restricted to designated balconies.</li>
            <li>GDPR-compliant data retention: 36 months.</li>
          </ul>
        </div>

        <div className="flex items-center justify-between border-t pt-5">
          <span className="text-xs text-success">{saved ? "Settings saved." : ""}</span>
          <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md">Save changes</button>
        </div>
      </form>
    </AppLayout>
  );
}
