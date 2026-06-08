import { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import { AppLayout } from "../components/AppLayout";

const API = axios.create({
  baseURL: "http://localhost:5000/api/tasks",
});

export default function Housekeeping() {
  const [open, setOpen] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [staff, setStaff] = useState([]);

  const [form, setForm] = useState({
    title: "Cleaning",
    room: "",
    assignedTo: "",
    description: "",
  });

  const loadData = async () => {
    try {
      const [tasksRes, roomsRes, staffRes] =
        await Promise.all([
          API.get("/"),
          API.get("/available-rooms"),
          API.get("/staff"),
        ]);

      setTasks(tasksRes.data.tasks || []);
      setRooms(roomsRes.data.rooms || []);
      setStaff(staffRes.data.staff || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const createTask = async () => {
    try {
      await API.post("/", form);

      setOpen(false);

      setForm({
        title: "Cleaning",
        room: "",
        assignedTo: "",
        description: "",
      });

      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const completeTask = async (id) => {
    try {
      await API.patch(`/${id}/status`, {
        status: "done",
      });

      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "done":
        return "bg-green-500/20 text-green-600";

      case "urgent":
        return "bg-red-500/20 text-red-600";

      case "in-progress":
        return "bg-blue-500/20 text-blue-600";

      default:
        return "bg-yellow-500/20 text-yellow-600";
    }
  };

  return (
    <AppLayout
      title="Housekeeping"
      subtitle="Daily cleaning queue"
    >
      {/* Header */}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-display">
          Tasks
        </h2>

        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md"
        >
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>

      {/* Task List */}

      <div className="card-elevated p-5 space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No tasks found
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-secondary text-primary grid place-items-center font-semibold">
                  {task.room?.roomId}
                </div>

                <div>
                  <div className="text-sm font-medium">
                    {task.title}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Assigned to:{" "}
                    {task.assignedTo?.name}
                    {task.description &&
                      ` · ${task.description}`}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-md ${statusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>

                {task.status !== "done" && (
                  <button
                    onClick={() =>
                      completeTask(task._id)
                    }
                    className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Task Modal */}

      {open && (
        <div
          className="fixed inset-0 bg-black/50 grid place-items-center p-4 z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="card-elevated bg-background w-full max-w-md p-6 space-y-3"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <h2 className="font-display text-xl">
              New Task
            </h2>

            {/* Type */}

            <label className="block text-sm">
              Type

              <select
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
              >
                <option>
                  Cleaning
                </option>

                <option>
                  Deep Cleaning
                </option>

                <option>
                  Maintenance
                </option>
              </select>
            </label>

            {/* Room */}

            <label className="block text-sm">
              Room

              <select
                value={form.room}
                onChange={(e) =>
                  setForm({
                    ...form,
                    room: e.target.value,
                  })
                }
                className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
              >
                <option value="">
                  Select Room
                </option>

                {rooms.map((room) => (
                  <option
                    key={room._id}
                    value={room._id}
                  >
                    #{room.roomId} ·{" "}
                    {room.category}
                  </option>
                ))}
              </select>
            </label>

            {/* Staff */}

            <label className="block text-sm">
              Assignee

              <select
                value={form.assignedTo}
                onChange={(e) =>
                  setForm({
                    ...form,
                    assignedTo:
                      e.target.value,
                  })
                }
                className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
              >
                <option value="">
                  Select Staff
                </option>

                {staff.map((user) => (
                  <option
                    key={user._id}
                    value={user._id}
                  >
                    {user.name} (
                    {user.role})
                  </option>
                ))}
              </select>
            </label>

            {/* Description */}

            <label className="block text-sm">
              Note

              <input
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description:
                      e.target.value,
                  })
                }
                className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
              />
            </label>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() =>
                  setOpen(false)
                }
                className="px-4 py-2 text-sm hover:bg-muted rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={createTask}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}