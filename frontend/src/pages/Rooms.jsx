import axios from "axios";
import { AppLayout, StatusPill } from "../components/AppLayout.jsx";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

const fmtMoney = (n) => `$${n}`;

export default function Rooms() {
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const role = localStorage.getItem("role");
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const getStatusColor = (status) => {
  switch (status) {
    case "available":
      return "bg-green-100 text-green-700 border-green-300";

    case "occupied":
      return "bg-red-100 text-red-700 border-red-300";

    case "cleaning":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";

    case "maintenance":
      return "bg-blue-100 text-blue-700 border-blue-300";

    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
};
  const [formData, setFormData] = useState({
    roomId: "",
    floor: "",
    guests: "",
    price: "",
    category: "standard",
    status: "available",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/rooms/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRooms(response.data.rooms || response.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);

      setAlert({
        message: "Failed to load rooms",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateRoom = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/rooms/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchRooms();

      setFormData({
        roomId: "",
        floor: "",
        guests: "",
        price: "",
        category: "standard",
        status: "available",
      });

      setOpen(false);

      setAlert({
        message: "Room created successfully",
        type: "success",
      });
    } catch (err) {
      console.error(err);

      setAlert({
        message: "Failed to create room",
        type: "error",
      });
    }
  };

  return (
    <AppLayout
      title="Rooms"
      subtitle="Live inventory across 5 floors and 40 rooms."
    >
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

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 mb-5">
          <button className="px-3 py-1.5 rounded-md text-sm border bg-primary text-primary-foreground border-primary capitalize">
            all
          </button>

          <button className="px-3 py-1.5 rounded-md text-sm border bg-card hover:bg-muted capitalize">
            available
          </button>

          <button className="px-3 py-1.5 rounded-md text-sm border bg-card hover:bg-muted capitalize">
            occupied
          </button>

          <button className="px-3 py-1.5 rounded-md text-sm border bg-card hover:bg-muted capitalize">
            cleaning
          </button>

          <button className="px-3 py-1.5 rounded-md text-sm border bg-card hover:bg-muted capitalize">
            maintenance
          </button>
        </div>
        {role !== "guest" && (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          New Room
        </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-3">
  {rooms.map((r) => (
  <div
    key={r.roomId}
    className="card-elevated p-4 border border-border rounded-lg"
  >
    <div className="flex items-start justify-between">
      <div className="font-display text-2xl text-primary">
        #{r.roomId}
      </div>

      <StatusPill
      status={r.status}
      className={getStatusColor(r.status)}
    />
    </div>

    <div className="text-xs text-muted-foreground mt-1">
      Floor {r.floor} · {r.guests} guests
    </div>

    <div className="text-sm font-medium mt-2 capitalize">
      {r.category}
    </div>

    <div className="text-sm text-accent font-semibold mt-1">
      {fmtMoney(r.price)}/night
    </div>

    <div
      className={`mt-3 w-full text-xs border rounded-md px-2 py-2 capitalize text-center font-medium ${getStatusColor(
        r.status
      )}`}
    >
      {r.status}
    </div>
  </div>
))}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center p-4 z-50">
          <div className="card-elevated w-full max-w-md p-6 space-y-4 bg-background rounded-lg">
            <h2 className="font-display text-xl">
              Create New Room
            </h2>

            <label className="block text-sm">
              Room ID
              <input
                type="number"
                name="roomId"
                value={formData.roomId}
                onChange={handleChange}
                className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
              />
            </label>

            <label className="block text-sm">
              Floor
              <input
                type="number"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
              />
            </label>

            <label className="block text-sm">
              Guests
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
              />
            </label>

            <label className="block text-sm">
              Price
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
              />
            </label>

            <label className="block text-sm">
              Category
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
              >
                <option value="standard">Standard</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
              </select>
            </label>

            <label className="block text-sm">
              Status
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="cleaning">Cleaning</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </label>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm hover:bg-muted rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateRoom}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md"
              >
                Create Room
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}