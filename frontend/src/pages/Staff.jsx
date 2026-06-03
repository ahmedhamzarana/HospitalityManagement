import { useState } from "react";
import { Plus } from "lucide-react";
import { AppLayout } from "../components/AppLayout.jsx";

export default function Staff() {
  const [open, setOpen] = useState(false);

  return (
    <AppLayout title="Staff & Roles" subtitle="Admin: manage team">

      {/* HEADER */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> Add staff
        </button>
      </div>

      {/* TABLE (STATIC UI) */}
      <div className="card-elevated overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-secondary text-xs uppercase text-muted-foreground">
            <tr className="text-left">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>

            <tr className="border-t">
              <td className="px-4 py-3 font-medium">John Manager</td>
              <td className="px-4 py-3 text-muted-foreground">john@hotel.com</td>
              <td className="px-4 py-3 capitalize">manager</td>
              <td className="px-4 py-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-600">
                  Active
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <button className="text-xs text-accent">Deactivate</button>
              </td>
            </tr>

            <tr className="border-t">
              <td className="px-4 py-3 font-medium">Sara Ali</td>
              <td className="px-4 py-3 text-muted-foreground">sara@hotel.com</td>
              <td className="px-4 py-3 capitalize">receptionist</td>
              <td className="px-4 py-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-600">
                  Active
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <button className="text-xs text-accent">Deactivate</button>
              </td>
            </tr>

            <tr className="border-t">
              <td className="px-4 py-3 font-medium">Ali Khan</td>
              <td className="px-4 py-3 text-muted-foreground">ali@hotel.com</td>
              <td className="px-4 py-3 capitalize">housekeeping</td>
              <td className="px-4 py-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  Inactive
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <button className="text-xs text-accent">Activate</button>
              </td>
            </tr>

          </tbody>

        </table>
      </div>

      {/* MODAL (OPEN / CLOSE ONLY) */}
      {open && (
<div className="fixed inset-0 bg-primary/40 grid place-items-center p-4 z-50">

  <div className="card-elevated w-full max-w-md p-6 space-y-3">

    <h2 className="font-display text-xl">Add staff</h2>

    {/* NAME */}
    <label className="block text-sm">
      Name
      <input
        defaultValue="John Doe"
        className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
      />
    </label>

    {/* EMAIL */}
    <label className="block text-sm">
      Email
      <input
        defaultValue="john@hotel.com"
        className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
      />
    </label>

    {/* ROLE */}
    <label className="block text-sm">
      Role
      <select
        defaultValue="receptionist"
        className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
      >
        <option>manager</option>
        <option>receptionist</option>
        <option>housekeeping</option>
        <option>maintenance</option>
      </select>
    </label>

    {/* BUTTONS */}
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