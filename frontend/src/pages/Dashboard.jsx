import {
  ArrowUpRight,
  BedDouble,
  CalendarCheck,
  DollarSign,
  Sparkles,
  Star,
} from "lucide-react";
import { AppLayout } from "../components/AppLayout";

export default function Dashboard() {
  return (
   <AppLayout title="Welcome back, Alex" subtitle="Here's what's happening across LuxuryStay today.">


    <div>


      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="card-elevated p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Occupancy
              </div>
              <div className="stat-number mt-2">78%</div>
              <div className="text-xs text-muted-foreground mt-1">
                12 / 15 rooms
              </div>
            </div>
            <div className="w-10 h-10 rounded-md bg-secondary text-primary grid place-items-center">
              <BedDouble className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="card-elevated p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Arrivals
              </div>
              <div className="stat-number mt-2">6</div>
              <div className="text-xs text-muted-foreground mt-1">
                Confirmed bookings
              </div>
            </div>
            <div className="w-10 h-10 rounded-md bg-secondary text-primary grid place-items-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="card-elevated p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Revenue (period)
              </div>
              <div className="stat-number mt-2">$12,450</div>
              <div className="text-xs text-muted-foreground mt-1">
                Across all reservations
              </div>
            </div>
            <div className="w-10 h-10 rounded-md bg-secondary text-primary grid place-items-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="card-elevated p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Guest rating
              </div>
              <div className="stat-number mt-2">4.6★</div>
              <div className="text-xs text-muted-foreground mt-1">
                128 reviews
              </div>
            </div>
            <div className="w-10 h-10 rounded-md bg-secondary text-primary grid place-items-center">
              <Star className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        
        {/* RESERVATIONS */}
        <div className="card-elevated p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display">Recent reservations</h2>
            <a
              href="#"
              className="text-xs text-accent inline-flex items-center gap-1 hover:underline"
            >
              View all <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground border-b">
              <tr className="text-left">
                <th className="py-2 font-medium">Guest</th>
                <th className="py-2 font-medium">Room</th>
                <th className="py-2 font-medium">Dates</th>
                <th className="py-2 font-medium">Status</th>
                <th className="py-2 font-medium text-right">Total</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-3">John Smith</td>
                <td className="py-3 text-muted-foreground">
                  #101 · Deluxe
                </td>
                <td className="py-3 text-muted-foreground">
                  10 Jun → 12 Jun
                </td>
                <td className="py-3">Confirmed</td>
                <td className="py-3 text-right font-medium">$450</td>
              </tr>

              <tr className="border-b">
                <td className="py-3">Sarah Khan</td>
                <td className="py-3 text-muted-foreground">
                  #202 · Suite
                </td>
                <td className="py-3 text-muted-foreground">
                  11 Jun → 14 Jun
                </td>
                <td className="py-3">Pending</td>
                <td className="py-3 text-right font-medium">$980</td>
              </tr>

              <tr>
                <td className="py-3">Ali Ahmed</td>
                <td className="py-3 text-muted-foreground">
                  #305 · Standard
                </td>
                <td className="py-3 text-muted-foreground">
                  09 Jun → 11 Jun
                </td>
                <td className="py-3">Confirmed</td>
                <td className="py-3 text-right font-medium">$320</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* HOUSEKEEPING */}
        <div className="card-elevated p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display">Housekeeping queue</h2>
            <Sparkles className="w-4 h-4 text-gold" />
          </div>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-secondary text-primary grid place-items-center text-xs font-semibold">
                101
              </div>
              <div className="flex-1">
                <div className="text-sm capitalize">cleaning</div>
                <div className="text-xs text-muted-foreground">
                  Maria
                </div>
              </div>
              <span>Pending</span>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-secondary text-primary grid place-items-center text-xs font-semibold">
                202
              </div>
              <div className="flex-1">
                <div className="text-sm capitalize">maintenance</div>
                <div className="text-xs text-muted-foreground">
                  John
                </div>
              </div>
              <span>In progress</span>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-secondary text-primary grid place-items-center text-xs font-semibold">
                305
              </div>
              <div className="flex-1">
                <div className="text-sm capitalize">cleaning</div>
                <div className="text-xs text-muted-foreground">
                  Ayesha
                </div>
              </div>
              <span>Done</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
        </AppLayout>
  );
}