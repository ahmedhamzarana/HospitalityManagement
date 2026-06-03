import { AppLayout } from "../components/AppLayout.jsx";

export default function Settings() {
  return (
    <AppLayout
      title="System Settings"
      subtitle="Admin controls for hotel-wide configuration."
    >

      <div className="card-elevated p-6 max-w-2xl space-y-5">

        {/* PROPERTY */}
        <div>
          <h2 className="font-display text-lg">Property</h2>
          <p className="text-xs text-muted-foreground">
            Branding shown across the system.
          </p>
        </div>

        <label className="block text-sm">
          Hotel name
          <input
            defaultValue="LuxuryStay Hotel"
            className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">

          <label className="block text-sm">
            Tax rate (%)
            <input
              type="number"
              defaultValue={12}
              className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
            />
          </label>

          <label className="block text-sm">
            Currency
            <select
              defaultValue="USD"
              className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
            >
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>INR</option>
              <option>JPY</option>
              <option>AED</option>
            </select>
          </label>

        </div>

        {/* POLICIES */}
        <div className="border-t pt-5">

          <h2 className="font-display text-lg">Policies</h2>

          <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2 space-y-1">
            <li>Standard check-in 3:00 PM · check-out 11:00 AM.</li>
            <li>Late cancellations (under 24h) incur one night charge.</li>
            <li>Smoking restricted to designated balconies.</li>
            <li>GDPR-compliant data retention: 36 months.</li>
          </ul>

        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between border-t pt-5">

          <span className="text-xs text-muted-foreground">
            Demo mode (no saving enabled)
          </span>

          <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md">
            Save changes
          </button>

        </div>

      </div>

    </AppLayout>
  );
}