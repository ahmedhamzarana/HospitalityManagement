import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { AppLayout, StatusPill } from "../components/AppLayout.jsx";
import { store, useStore } from "../lib/store.js";

const STAGES = ["pending", "in-progress", "done"];

export default function Housekeeping() {
  const tasks = useStore((s) => s.tasks);
  const rooms = useStore((s) => s.rooms);
  const allStaff = useStore((s) => s.staff);

  // FIXED: avoid returning a new array directly from Zustand selector
  const staff = useMemo(() => {
    return allStaff.filter(
      (p) =>
        p.role === "housekeeping" ||
        p.role === "maintenance"
    );
  }, [allStaff]);

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    roomId: "",
    type: "cleaning",
    assignee: "",
    note: "",
  });

  const submit = (e) => {
    e.preventDefault();

    if (!form.roomId || !form.assignee) return;

    store.addTask({
      ...form,
      status: "pending",
    });

    setForm({
      roomId: "",
      type: "cleaning",
      assignee: "",
      note: "",
    });

    setOpen(false);
  };

  return (
    <AppLayout
      title="Housekeeping"
      subtitle="Drag through stages to keep the floor moving."
    >
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          New task
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {STAGES.map((stage) => (
          <div
            key={stage}
            className="card-elevated p-4 min-h-[300px]"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium capitalize">
                {stage.replace("-", " ")}
              </h3>

              <StatusPill status={stage} />
            </div>

            <div className="space-y-2">
              {tasks
                .filter((t) => t.status === stage)
                .map((t) => {
                  const room = rooms.find(
                    (r) => r.id === t.roomId
                  );

                  return (
                    <div
                      key={t.id}
                      className="bg-secondary rounded-md p-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-sm">
                          Room #{room?.number}
                        </div>

                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          {t.type}
                        </span>
                      </div>

                      <div className="text-xs text-muted-foreground mt-0.5">
                        {t.assignee}
                      </div>

                      {t.note && (
                        <div className="text-xs mt-1">
                          {t.note}
                        </div>
                      )}

                      <div className="flex gap-1 mt-2 flex-wrap">
                        {STAGES.filter((s) => s !== stage).map((s) => (
                          <button
                            key={s}
                            onClick={() =>
                              store.setTaskStatus(t.id, s)
                            }
                            className="text-[10px] px-2 py-0.5 rounded bg-card hover:bg-muted capitalize"
                          >
                            → {s.replace("-", " ")}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-primary/40 grid place-items-center p-4 z-50"
          onClick={() => setOpen(false)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={submit}
            className="card-elevated w-full max-w-md p-6 space-y-3"
          >
            <h2 className="font-display text-xl">
              New task
            </h2>

            <label className="block text-sm">
              Room

              <select
                required
                value={form.roomId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    roomId: e.target.value,
                  })
                }
                className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
              >
                <option value="">
                  Select a room…
                </option>

                {rooms.map((r) => (
                  <option
                    key={r.id}
                    value={r.id}
                  >
                    #{r.number} · {r.type}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm">
              Type

              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value,
                  })
                }
                className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
              >
                <option value="cleaning">
                  Cleaning
                </option>

                <option value="maintenance">
                  Maintenance
                </option>
              </select>
            </label>

            <label className="block text-sm">
              Assignee

              <select
                required
                value={form.assignee}
                onChange={(e) =>
                  setForm({
                    ...form,
                    assignee: e.target.value,
                  })
                }
                className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
              >
                <option value="">
                  Select staff…
                </option>

                {staff.map((s) => (
                  <option
                    key={s.id}
                    value={s.name}
                  >
                    {s.name} ({s.role})
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm">
              Note (optional)

              <input
                value={form.note}
                onChange={(e) =>
                  setForm({
                    ...form,
                    note: e.target.value,
                  })
                }
                className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
              />
            </label>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm hover:bg-muted rounded-md"
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </AppLayout>
  );
}