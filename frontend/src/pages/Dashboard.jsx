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
      </div>
    </AppLayout>
  );
}