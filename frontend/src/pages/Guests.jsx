import { useState } from "react";
import { Plus, Star } from "lucide-react";
import { AppLayout } from "../components/AppLayout.jsx";

export default function Guests() {
  const [open, setOpen] = useState(false);

  return (
    <AppLayout title="Guests" subtitle="3 profiles · 1 VIP">

      {/* HEADER ACTION */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> New guest
        </button>
      </div>

      {/* GUEST CARDS */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

        <div className="card-elevated p-5">
          <div className="flex justify-between">
            <div>
              <div className="font-display text-lg flex items-center gap-2">
                John Smith
                <Star className="w-4 h-4 fill-gold text-gold" />
              </div>
              <div className="text-xs text-muted-foreground">
                Member since 2024-01-10
              </div>
            </div>

            <div className="w-10 h-10 rounded-full bg-secondary text-primary grid place-items-center font-semibold text-sm">
              JS
            </div>
          </div>

          <div className="text-sm mt-3 text-muted-foreground">
            john@example.com
          </div>
          <div className="text-sm text-muted-foreground">
            +92 300 1234567
          </div>

          <div className="text-xs mt-3 bg-secondary px-3 py-2 rounded-md">
            <b>Preferences:</b> High floor, extra pillows
          </div>
        </div>

        <div className="card-elevated p-5">
          <div className="flex justify-between">
            <div>
              <div className="font-display text-lg">Sarah Khan</div>
              <div className="text-xs text-muted-foreground">
                Member since 2023-09-22
              </div>
            </div>

            <div className="w-10 h-10 rounded-full bg-secondary text-primary grid place-items-center font-semibold text-sm">
              SK
            </div>
          </div>

          <div className="text-sm mt-3 text-muted-foreground">
            sarah@example.com
          </div>
          <div className="text-sm text-muted-foreground">
            +92 301 9876543
          </div>
        </div>

        <div className="card-elevated p-5">
          <div className="flex justify-between">
            <div>
              <div className="font-display text-lg">Ali Ahmed</div>
              <div className="text-xs text-muted-foreground">
                Member since 2025-03-15
              </div>
            </div>

            <div className="w-10 h-10 rounded-full bg-secondary text-primary grid place-items-center font-semibold text-sm">
              AA
            </div>
          </div>

          <div className="text-sm mt-3 text-muted-foreground">
            ali@example.com
          </div>
          <div className="text-sm text-muted-foreground">
            +92 302 5556677
          </div>

          <div className="text-xs mt-3 bg-secondary px-3 py-2 rounded-md">
            <b>Preferences:</b> Late checkout
          </div>
        </div>

      </div>

      {/* MODAL (OPEN / CLOSE CONTROLLED) */}
      {open && (
       <div className="fixed inset-0 bg-primary/40 grid place-items-center p-4 z-50">
  <div className="card-elevated w-full max-w-md p-6 space-y-3">

    <h2 className="font-display text-xl">New guest</h2>

    <label className="block text-sm capitalize">
      Name
      <input
        className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
        placeholder="John Smith"
      />
    </label>

    <label className="block text-sm capitalize">
      Email
      <input
        className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
        placeholder="john@example.com"
      />
    </label>

    <label className="block text-sm capitalize">
      Phone
      <input
        className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
        placeholder="+92 300 1234567"
      />
    </label>

    <label className="block text-sm capitalize">
      Preferences
      <input
        className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
        placeholder="High floor, extra pillows"
      />
    </label>

    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" />
      VIP guest
    </label>

    <div className="flex justify-end gap-2">
 <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm hover:bg-muted rounded-md"
              >
                Cancel
              </button>
      <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md">
        Save
      </button>
    </div>

  </div>
</div>
      )}

    </AppLayout>
  );
}