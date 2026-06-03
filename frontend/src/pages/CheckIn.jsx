import { AppLayout, StatusPill } from "../components/AppLayout.jsx";

export default function CheckIn() {
  return (
    <AppLayout
      title="Check-in / Check-out"
      subtitle="Smooth arrivals and departures."
    >
      <div className="grid lg:grid-cols-2 gap-5">

        {/* ARRIVALS */}
        <section className="card-elevated p-5">
          <h2 className="font-display text-lg mb-3">
            Today's arrivals{" "}
            <span className="text-muted-foreground text-sm">(2)</span>
          </h2>

          {/* ROW 1 */}
          <div className="flex items-center justify-between border-t py-3">
            <div>
              <div className="font-medium">
                John Smith <span className="text-gold text-xs ml-1">VIP</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Room #101 · Deluxe · 2026-06-10 → 2026-06-12
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2 py-1 text-xs rounded bg-muted capitalize">
                available
              </span>              <button className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:opacity-90">
                Check in & assign key
              </button>
            </div>
          </div>

          {/* ROW 2 */}
          <div className="flex items-center justify-between border-t py-3">
            <div>
              <div className="font-medium">Sarah Khan</div>
              <div className="text-xs text-muted-foreground">
                Room #202 · Suite · 2026-06-11 → 2026-06-14
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2 py-1 text-xs rounded bg-muted capitalize">
                available
              </span>              <button className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:opacity-90">
                Check in & assign key
              </button>
            </div>
          </div>
        </section>

        {/* DEPARTURES */}
        <section className="card-elevated p-5">
          <h2 className="font-display text-lg mb-3">
            Departures{" "}
            <span className="text-muted-foreground text-sm">(2)</span>
          </h2>

          {/* ROW 1 */}
          <div className="flex items-center justify-between border-t py-3">
            <div>
              <div className="font-medium">Ali Ahmed</div>
              <div className="text-xs text-muted-foreground">
                Room #305 · Standard · 2026-06-09 → 2026-06-11
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2 py-1 text-xs rounded bg-muted capitalize">
                available
              </span>              <button className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:opacity-90">
                Check out & bill
              </button>
            </div>
          </div>

          {/* ROW 2 */}
          <div className="flex items-center justify-between border-t py-3">
            <div>
              <div className="font-medium">Emma Watson</div>
              <div className="text-xs text-muted-foreground">
                Room #401 · Deluxe · 2026-06-08 → 2026-06-10
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2 py-1 text-xs rounded bg-muted capitalize">
                available
              </span>              <button className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:opacity-90">
                Check out & bill
              </button>
            </div>
          </div>
        </section>

      </div>
    </AppLayout>
  );
}