import { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import { AppLayout, StatusPill } from "../components/AppLayout.jsx";

const fmtMoney = (n) => `$ ${n}`;

// =======================
// STATUS FLOW
// =======================
const STATUS_FLOW = {
  pending: "confirmed",
  confirmed: "checked_in",
  checked_in: "checked_out",
  checked_out: "completed",
};

const STATUS_LABEL = {
  pending: "Confirm",
  confirmed: "Check-in",
  checked_in: "Check-out",
  checked_out: "Complete",
};

export default function Reservations() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);

  const [alert, setAlert] = useState({ message: "", type: "" });
  // =======================
  // FORM Date Constraints
  // =======================
  const today = new Date().toISOString().split("T")[0];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tomorrowDate = tomorrow
  .toISOString()
  .split("T")[0];
// =======================
// FORM STATE
// =======================
  const [form, setForm] = useState({
    _id: null,
    user: "",
    room: "",
    checkIn: "",
    checkOut: "",
  });

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // =======================
  // FETCH DATA
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
  const { name, value } = e.target;

  if (name === "checkIn") {
    setForm((prev) => ({
      ...prev,
      checkIn: value,
      checkOut: "",
    }));
    return;
  }

  if (name === "checkOut") {
    const checkInDate = new Date(form.checkIn);
    const checkOutDate = new Date(value);

    if (checkOutDate <= checkInDate) {
      setAlert({
        message:
          "Check-out must be after Check-in date",
        type: "error",
      });
      return;
    }
  }

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const resetForm = () => {
    setForm({
      _id: null,
      user: "",
      room: "",
      checkIn: "",
      checkOut: "",
    });
  };

  // =======================
  // CREATE / UPDATE
  // =======================
  const saveReservation = async () => {
    try {
      if (!form.user || !form.room || !form.checkIn || !form.checkOut) {
        setAlert({ message: "All fields are required", type: "error" });
        return;
      }

      if (form._id) {
        await axios.patch(
          `http://localhost:5000/api/reservation/update/${form._id}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAlert({ message: "Reservation updated", type: "success" });
      } else {
        await axios.post(
          "http://localhost:5000/api/reservation/create",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAlert({ message: "Reservation created", type: "success" });
      }

      setOpen(false);
      resetForm();
      fetchReservation();
    } catch (err) {
      setAlert({
        message: err.response?.data?.message || "Operation failed",
        type: "error",
      });
    }
  };

  // =======================
  // STATUS UPDATE
  // =======================
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

  // =======================
  // CANCEL
  // =======================
  const cancelReservation = async (id) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/reservation/status/${id}`,
        { status: "cancelled" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAlert({ message: "Reservation cancelled", type: "success" });
      fetchReservation();
    } catch (err) {
      setAlert({
        message: err.response?.data?.message || "Cancel failed",
        type: "error",
      });
    }
  };


  // =======================
  // UI HELPERS
  // =======================
  const getNextStatus = (status) => STATUS_FLOW[status] || null;
  const getButtonLabel = (status) => STATUS_LABEL[status] || "";

  return (
    <AppLayout title="Reservations" subtitle="All bookings">

      {/* ALERT */}
      {alert.message && (
        <div
          className={`mb-4 flex items-center gap-2 p-3 text-sm rounded-md border-l-4 shadow-sm
          ${alert.type === "success"
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
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
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
               <th className="px-4 py-3">Guest</th> <th className="px-4 py-3">Room</th>
                <th className="px-4 py-3">Check-in</th> <th className="px-4 py-3">Check-out</th>
                 <th className="px-4 py-3">Status</th> <th className="px-4 py-3 text-right">Total</th>
                 { role !== "guest" ? 
                  <th className="px-4 py-3 text-right">Action</th> : <></>                  }
                   </tr>
           </thead>

        <tbody>
          {reservations.map((r) => (
            <tr key={r._id} className="border-t">

              <td className="px-4 py-3">{r.user?.name}</td>
              <td className="px-4 py-3">
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
              <td className="px-4 py-3 text-right">
                {fmtMoney(r.room?.price || 0)}
              </td>
              {role === "guest"? 
                <></>
              :
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">

                  {/* STATUS BUTTON */}
                  {getNextStatus(r.status) && (
                    <button
                      onClick={() =>
                        updateStatus(r._id, getNextStatus(r.status))
                      }
                      className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md"
                    >
                      {getButtonLabel(r.status)}
                    </button>
                  )}

                  {/* CANCEL */}
                  {r.status !== "completed" && r.status !== "cancelled" && (
                    <button
                      onClick={() => cancelReservation(r._id)}
                      className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md"
                    >
                      Cancel
                    </button>
                  )}

                  {/* INVOICE ONLY AFTER COMPLETION */}
                  {r.status === "completed" && (
                    <button
                      onClick={() => generateInvoice(r)}
                      className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md"
                    >
                      Generate Invoice
                    </button>
                  )}

                </div>
              </td>
             }
            </tr>
          ))}
        </tbody>
      </table>
      </div>

    {/* MODAL */}
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

      {/* User */}
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

      {/* Room */}
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

      {/* Check-in */}
<label className="block text-sm">
  Check-in
  <input
    type="date"
    name="checkIn"
    value={form.checkIn}
    onChange={handleChange}
    min={today}
    className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
  />
</label>

      {/* Check-out */}
<label className="block text-sm">
  Check-out
  <input
    type="date"
    name="checkOut"
    value={form.checkOut}
    onChange={handleChange}
    min={
      form.checkIn
        ? new Date(
            new Date(form.checkIn).setDate(
              new Date(form.checkIn).getDate() + 1
            )
          )
            .toISOString()
            .split("T")[0]
        : tomorrowDate
    }
    className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
  />
</label>

      {/* Buttons */}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setOpen(false)}
          className="px-4 py-2 text-sm hover:bg-muted rounded-md"
        >
          Cancel
        </button>

        <button
          onClick={saveReservation}
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