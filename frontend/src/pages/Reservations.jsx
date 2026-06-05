import { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import { AppLayout, StatusPill } from "../components/AppLayout.jsx";

const fmtMoney = (n) => `$ ${n}`;

export default function Reservations() {
  const [open, setOpen] = useState(false);
  const [editopen, editsetOpen] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [alert, setAlert] = useState({ message: "", type: "" });

  const [form, setForm] = useState({
    user: "",
    room: "",
    checkIn: "",
    checkOut: "",
  });

  const token = localStorage.getItem("token");

  // =======================
  // FETCH RESERVATIONS
  // =======================
  const fetchReservation = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/reservation/all",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReservations(res.data || []);
    } catch (err) {
      setAlert({ message: "Failed to load reservations", type: "error" });
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users/all/guests",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/rooms/all/available",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRooms(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReservation();
    fetchUsers();
    fetchRooms();
  }, []);

  // =======================
  // FORM
  // =======================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createReservation = async () => {
    try {
      if (!form.user || !form.room || !form.checkIn || !form.checkOut) {
        setAlert({ message: "All fields are required", type: "error" });
        return;
      }

      await axios.post(
        "http://localhost:5000/api/reservation/create",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOpen(false);
      setForm({ user: "", room: "", checkIn: "", checkOut: "" });

      fetchReservation();
    } catch (err) {
      setAlert({
        message: err.response?.data?.message || "Failed to create",
        type: "error",
      });
    }
  };

  // =======================
  // STATUS FLOW LOGIC (YOUR REQUIREMENT)
  // =======================
  const getNextStatus = (status) => {
    switch (status) {
      case "pending":
        return "confirmed";
      case "confirmed":
        return "checked_in";
      case "checked_in":
        return "checked_out";
      case "checked_out":
        return "completed";
      default:
        return null;
    }
  };

  const getButtonLabel = (status) => {
    switch (status) {
      case "pending":
        return "Confirm";
      case "confirmed":
        return "Check-in";
      case "checked_in":
        return "Check-out";
      case "checked_out":
        return "Complete";
      default:
        return "";
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/reservation/status/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchReservation();
    } catch (err) {
      setAlert({
        message: err.response?.data?.message || "Update failed",
        type: "error",
      });
    }
  };

  return (
    <AppLayout title="Reservations" subtitle="All bookings">

      {/* ALERT */}
      {alert.message && (
        <div
          className={`mb-4 flex items-center gap-2 p-3 text-sm rounded-md border-l-4 shadow-sm
          ${
            alert.type === "success"
              ? "bg-green-50 border-green-500 text-green-700"
              : "bg-red-50 border-red-500 text-red-700"
          }`}
        >
          <span>{alert.type === "success" ? "✓" : "✕"}</span>
          <span>{alert.message}</span>
        </div>
      )}

      {/* BUTTON */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm"
        >
          <Plus className="w-4 h-4" /> New reservation
        </button>
      </div>

      {/* TABLE */}
      <div className="card-elevated overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left bg-secondary text-xs uppercase">
              <th className="px-4 py-3">Guest</th>
              <th className="px-4 py-3">Room</th>
              <th className="px-4 py-3">Check-in</th>
              <th className="px-4 py-3">Check-out</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {reservations.map((r) => (
              <tr key={r._id} className="border-t hover:bg-muted/30">

                <td className="px-4 py-3 font-medium">{r.user?.name}</td>

                <td className="px-4 py-3 text-muted-foreground">
                  #{r.room?.roomId} · {r.room?.category}
                </td>

                <td className="px-4 py-3">
                  {new Date(r.checkIn).toDateString()}
                </td>

                <td className="px-4 py-3">
                  {new Date(r.checkOut).toDateString()}
                </td>

                <td className="px-4 py-3">
                  <StatusPill status={r.status} />
                </td>

                <td className="px-4 py-3 text-right font-medium">
                  {fmtMoney(r.room?.price || 0)}
                </td>

                {/* ACTION COLUMN */}
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">

                    {getNextStatus(r.status) && (
                      <button
                        onClick={() =>
                          updateStatus(r._id, getNextStatus(r.status))
                        }
                        className="px-3 py-1 text-sm bg-green-500 text-white rounded-md"
                      >
                        {getButtonLabel(r.status)}
                      </button>
                    )}

                    <button
                      onClick={() => editsetOpen(true)}
                      className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md"
                    >
                      Edit
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE MODAL (UNCHANGED UI) */}
      {open && (
        <div
          className="fixed inset-0 bg-primary/40 grid place-items-center p-4 z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="card-elevated w-full max-w-md p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-xl">New reservation</h2>

            <label className="block text-sm">
              User
              <select
                name="user"
                value={form.user}
                onChange={handleChange}
                className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
              >
                <option value="">Select Guest User</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>{u.name}</option>
                ))}
              </select>
            </label>

            <label className="block text-sm">
              Room
              <select
                name="room"
                value={form.room}
                onChange={handleChange}
                className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
              >
                <option value="">Select Available Room</option>
                {rooms.map((r) => (
                  <option key={r._id} value={r._id}>
                    #{r.roomId} · {r.category} · Rs {r.price}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <input type="date" name="checkIn" value={form.checkIn} onChange={handleChange}
                className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2" />

              <input type="date" name="checkOut" value={form.checkOut} onChange={handleChange}
                className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2" />
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="px-4 py-2 text-sm hover:bg-muted rounded-md">
                Cancel
              </button>

              <button onClick={createReservation}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

    </AppLayout>
  );
}