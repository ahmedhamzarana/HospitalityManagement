import { AppLayout } from "../components/AppLayout.jsx";

export default function Reports() {
  return (
    <AppLayout title="Reports & Analytics" subtitle="Snapshot for leadership review">

      <div className="grid lg:grid-cols-2 gap-5">

        {/* REVENUE BY TYPE */}
        <section className="card-elevated p-6">
          <h2 className="font-display text-lg mb-4">Revenue by room type</h2>

          <ul className="space-y-3">

            <li>
              <div className="flex justify-between text-sm">
                <span>Deluxe</span>
                <span className="font-medium">$12,400</span>
              </div>
              <div className="h-2 bg-secondary rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full w-[85%]" />
              </div>
            </li>

            <li>
              <div className="flex justify-between text-sm">
                <span>Suite</span>
                <span className="font-medium">$18,200</span>
              </div>
              <div className="h-2 bg-secondary rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full w-[100%]" />
              </div>
            </li>

            <li>
              <div className="flex justify-between text-sm">
                <span>Standard</span>
                <span className="font-medium">$9,800</span>
              </div>
              <div className="h-2 bg-secondary rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full w-[60%]" />
              </div>
            </li>

          </ul>
        </section>

        {/* ROOM STATUS */}
        <section className="card-elevated p-6">
          <h2 className="font-display text-lg mb-4">Room status mix</h2>

          <div className="grid grid-cols-2 gap-3">

            <div className="bg-secondary rounded-md p-4">
              <div className="text-xs uppercase text-muted-foreground">available</div>
              <div className="stat-number mt-1">18</div>
              <div className="text-xs text-muted-foreground">45% of inventory</div>
            </div>

            <div className="bg-secondary rounded-md p-4">
              <div className="text-xs uppercase text-muted-foreground">occupied</div>
              <div className="stat-number mt-1">12</div>
              <div className="text-xs text-muted-foreground">30% of inventory</div>
            </div>

            <div className="bg-secondary rounded-md p-4">
              <div className="text-xs uppercase text-muted-foreground">cleaning</div>
              <div className="stat-number mt-1">6</div>
              <div className="text-xs text-muted-foreground">15% of inventory</div>
            </div>

            <div className="bg-secondary rounded-md p-4">
              <div className="text-xs uppercase text-muted-foreground">maintenance</div>
              <div className="stat-number mt-1">4</div>
              <div className="text-xs text-muted-foreground">10% of inventory</div>
            </div>

          </div>
        </section>

        {/* GUEST SATISFACTION */}
        <section className="card-elevated p-6">
          <h2 className="font-display text-lg mb-4">Guest satisfaction</h2>

          <div className="space-y-2">

            <div className="flex items-center gap-3 text-sm">
              <span className="w-8 text-muted-foreground">5★</span>
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gold w-[80%]" />
              </div>
              <span className="w-6 text-right text-muted-foreground">42</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="w-8 text-muted-foreground">4★</span>
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gold w-[60%]" />
              </div>
              <span className="w-6 text-right text-muted-foreground">18</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="w-8 text-muted-foreground">3★</span>
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gold w-[30%]" />
              </div>
              <span className="w-6 text-right text-muted-foreground">9</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="w-8 text-muted-foreground">2★</span>
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gold w-[10%]" />
              </div>
              <span className="w-6 text-right text-muted-foreground">3</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="w-8 text-muted-foreground">1★</span>
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gold w-[5%]" />
              </div>
              <span className="w-6 text-right text-muted-foreground">1</span>
            </div>

          </div>
        </section>

        {/* BOOKING PIPELINE */}
        <section className="card-elevated p-6">
          <h2 className="font-display text-lg mb-4">Booking pipeline</h2>

          <div className="grid grid-cols-2 gap-3">

            <div className="bg-secondary rounded-md p-4">
              <div className="text-xs uppercase text-muted-foreground">confirmed</div>
              <div className="stat-number mt-1">14</div>
            </div>

            <div className="bg-secondary rounded-md p-4">
              <div className="text-xs uppercase text-muted-foreground">checked-in</div>
              <div className="stat-number mt-1">9</div>
            </div>

            <div className="bg-secondary rounded-md p-4">
              <div className="text-xs uppercase text-muted-foreground">checked-out</div>
              <div className="stat-number mt-1">21</div>
            </div>

            <div className="bg-secondary rounded-md p-4">
              <div className="text-xs uppercase text-muted-foreground">cancelled</div>
              <div className="stat-number mt-1">3</div>
            </div>

          </div>
        </section>

      </div>

    </AppLayout>
  );
}