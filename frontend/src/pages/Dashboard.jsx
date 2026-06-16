import {
  ArrowUpRight,
  BedDouble,
  CalendarCheck,
  DollarSign,
  Sparkles,
  Star,
} from "lucide-react";

import { AppLayout } from "../components/AppLayout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // ======================
  // FETCH DATA
  // ======================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // RESERVATIONS
        const resReservations = await axios.get(
          "http://localhost:5000/api/reservation/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setReservations(resReservations.data);

        // ROOMS
        const resRooms = await axios.get(
          "http://localhost:5000/api/rooms/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRooms(resRooms.data);

      } catch (err) {
        console.log(err);
        setError(
          err.response?.data?.message || "Failed to load dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ======================
  // STATS CALCULATION
  // ======================
  const totalRooms = rooms.length;

  const occupiedRooms = rooms.filter(
    (r) => r.status === "occupied"
  ).length;

  const occupancy = totalRooms
    ? Math.round((occupiedRooms / totalRooms) * 100)
    : 0;

  const totalRevenue = reservations.reduce((acc, r) => {
    return acc + (r.room?.price || 0);
  }, 0);

  return (
    <AppLayout
      title="Welcome back, Admin"
      subtitle="Here's what's happening across your hotel today."
    >
      <div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

          {/* OCCUPANCY */}
          <div className="card-elevated p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs uppercase text-muted-foreground">
                  Occupancy
                </div>
                <div className="stat-number mt-2">{occupancy}%</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {occupiedRooms} / {totalRooms} rooms
                </div>
              </div>
              <BedDouble className="w-5 h-5" />
            </div>
          </div>

          {/* RESERVATIONS */}
          <div className="card-elevated p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs uppercase text-muted-foreground">
                  Reservations
                </div>
                <div className="stat-number mt-2">
                  {reservations.length}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Total bookings
                </div>
              </div>
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>

          {/* REVENUE */}
          <div className="card-elevated p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs uppercase text-muted-foreground">
                  Revenue
                </div>
                <div className="stat-number mt-2">
                  ${totalRevenue}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Across reservations
                </div>
              </div>
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          {/* RATING */}
          <div className="card-elevated p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs uppercase text-muted-foreground">
                  Guest rating
                </div>
                <div className="stat-number mt-2">4.6★</div>
                <div className="text-xs text-muted-foreground mt-1">
                  128 reviews
                </div>
              </div>
              <Star className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">

          {/* RESERVATIONS TABLE */}
          <div className="card-elevated p-5 lg:col-span-2">

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display">
                Recent reservations
              </h2>

              <a
                href="#"
                className="text-xs text-accent inline-flex items-center gap-1"
              >
                View all <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <table className="w-full text-sm">

              <thead className="text-xs text-muted-foreground border-b">
                <tr className="text-left">
                  <th className="py-2">Guest</th>
                  <th className="py-2">Room</th>
                  <th className="py-2">Dates</th>
                  <th className="py-2">Status</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>

              <tbody>

                {/* LOADING */}
                {loading && (
                  <tr>
                    <td colSpan="5" className="py-4 text-center">
                      Loading...
                    </td>
                  </tr>
                )}

                {/* ERROR */}
                {error && (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-red-500">
                      {error}
                    </td>
                  </tr>
                )}

                {/* DATA */}
                {!loading &&
                  !error &&
                  reservations.map((r) => (
                    <tr key={r._id} className="border-b">

                      <td className="py-3">
                        {r.user?.name}
                      </td>

                      <td className="py-3 text-muted-foreground">
                        #{r.room?.roomId} · {r.room?.category}
                      </td>

                      <td className="py-3 text-muted-foreground">
                        {new Date(r.checkIn).toLocaleDateString()} →{" "}
                        {new Date(r.checkOut).toLocaleDateString()}
                      </td>

                      <td className="py-3 capitalize">
                        {r.status}
                      </td>

                      <td className="py-3 text-right font-medium">
                        ${r.room?.price}
                      </td>

                    </tr>
                  ))}

              </tbody>

            </table>
          </div>

          {/* HOUSEKEEPING */}
          <div className="card-elevated p-5">

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display">
                Housekeeping queue
              </h2>
              <Sparkles className="w-4 h-4" />
            </div>

            <ul className="space-y-3">
              <li>Room 101 - Cleaning - Pending</li>
              <li>Room 202 - Maintenance - In progress</li>
              <li>Room 305 - Cleaning - Done</li>
            </ul>

          </div>

        </div>
      </div>
    </AppLayout>
  );
}