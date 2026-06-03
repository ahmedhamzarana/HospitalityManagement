import { useState } from "react";
import { Sparkles, Plus } from "lucide-react";
import { AppLayout } from "../components/AppLayout.jsx";

export default function Housekeeping() {
  const [open, setOpen] = useState(false);

  return (
    <AppLayout title="Housekeeping" subtitle="Daily cleaning queue">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-display">Tasks</h2>

        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> New task
        </button>
      </div>

      {/* TASK LIST (STATIC UI) */}
      <div className="card-elevated p-5 space-y-3">

        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-secondary text-primary grid place-items-center font-semibold">
              101
            </div>
            <div>
              <div className="text-sm font-medium">Cleaning</div>
              <div className="text-xs text-muted-foreground">
                Assigned to: Maria · Fresh towels needed
              </div>
            </div>
          </div>

          <span className="text-xs bg-yellow-500/20 text-yellow-600 px-2 py-1 rounded-md">
            pending
          </span>
        </div>

        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-secondary text-primary grid place-items-center font-semibold">
              205
            </div>
            <div>
              <div className="text-sm font-medium">Maintenance</div>
              <div className="text-xs text-muted-foreground">
                Assigned to: Ali · AC not working
              </div>
            </div>
          </div>

          <span className="text-xs bg-red-500/20 text-red-600 px-2 py-1 rounded-md">
            urgent
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-secondary text-primary grid place-items-center font-semibold">
              312
            </div>
            <div>
              <div className="text-sm font-medium">Deep Cleaning</div>
              <div className="text-xs text-muted-foreground">
                Assigned to: Sara · Checkout complete
              </div>
            </div>
          </div>

          <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-md">
            done
          </span>
        </div>

      </div>

      {/* MODAL OPEN / CLOSE */}
      {open && (
  <div
    className="fixed inset-0 bg-primary/40 grid place-items-center p-4 z-50"
    onClick={() => setOpen(false)}
  >
    <div
      className="card-elevated w-full max-w-md p-6 space-y-3"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="font-display text-xl">New task</h2>

      <label className="block text-sm">
        Room
        <select className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2">
          <option>Select a room…</option>
          <option>#101 · Deluxe</option>
          <option>#102 · Suite</option>
        </select>
      </label>

      <label className="block text-sm">
        Type
        <select className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2">
          <option>Cleaning</option>
          <option>Maintenance</option>
        </select>
      </label>

      <label className="block text-sm">
        Assignee
        <select className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2">
          <option>Select staff…</option>
          <option>Ali (housekeeping)</option>
          <option>Ahmed (maintenance)</option>
        </select>
      </label>

      <label className="block text-sm">
        Note (optional)
        <input className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2" />
      </label>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-4 py-2 text-sm hover:bg-muted rounded-md"
        >
          Cancel
        </button>

        <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md">
          Create
        </button>
      </div>
    </div>
  </div>
)}
    </AppLayout>
  );
}