import { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import { AppLayout, StatusPill } from "../components/AppLayout.jsx";

const fmtMoney = (n) => `$ ${n}`;

export default function Reservations() {
  const [open, setOpen] = useState(false);
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

  // =======================
  // FETCH ONLY GUEST USERS
  // =======================
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

  // =======================
  // FETCH ONLY AVAILABLE ROOMS
  // =======================
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
  // FORM HANDLER
  // =======================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // =======================
  // CREATE RESERVATION
  // =======================
  const createReservation = async () => {
    try {
      // validation
      if (!form.user || !form.room || !form.checkIn || !form.checkOut) {
        setAlert({ message: "All fields are required", type: "error" });
        return;
      }

      await axios.post(
        "http://localhost:5000/api/reservation/create",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchReservation();
      fetchRooms(); // refresh available rooms

      setOpen(false);
      setForm({ user: "", room: "", checkIn: "", checkOut: "" });

      setAlert({
        message: "Reservation created successfully",
        type: "success",
      });
    } catch (err) {
      setAlert({
        message: err.response?.data?.message || "Failed to create",
        type: "error",
      });
    }
  };

  return (
    <AppLayout title="Reservations" subtitle="All bookings">

         {/* ALERT UI */}
      {alert.message && (
        <div
          className={`mb-4 flex items-center gap-2 p-3 text-sm rounded-md border-l-4 shadow-sm
          ${alert.type === "success"
              ? "bg-green-50 border-green-500 text-green-700"
              : "bg-red-50 border-red-500 text-red-700"
            }`}
        >
          <span className="text-lg">
            {alert.type === "success" ? "✓" : "✕"}
          </span>
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
            </tr>
          </thead>

          <tbody>
            {reservations.map((r) => (
              <tr key={r._id} className="border-t hover:bg-muted/30">

                <td className="px-4 py-3 font-medium">
                  {r.user?.name}
                </td>

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
                  <StatusPill status={r.status || "confirmed"} />
                </td>

                <td className="px-4 py-3 text-right font-medium">
                  {fmtMoney(r.room?.price || 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =======================
          MODAL
      ======================= */}
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

            {/* USER DROPDOWN */}
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
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </label>

            {/* ROOM DROPDOWN */}
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

            {/* DATES */}
            <div className="grid grid-cols-2 gap-3">

              <input
                type="date"
                name="checkIn"
                value={form.checkIn}
                onChange={handleChange}
                className="w-full bg-secondary border border-border rounded-md px-3 py-2"
              />

              <input
                type="date"
                name="checkOut"
                value={form.checkOut}
                onChange={handleChange}
                className="w-full bg-secondary border border-border rounded-md px-3 py-2"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-2">

              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm hover:bg-muted rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={createReservation}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md"
              >
                Confirm
              </button>

            </div>
          </div>
        </div>
      )}

    </AppLayout>
  );
}