import { AppLayout, StatusPill } from "../components/AppLayout.jsx";
const fmtMoney = (n) => `$${n}`;
export default function Rooms() {
  return (
    <AppLayout
      title="Rooms"
      subtitle="Live inventory across 5 floors and 40 rooms."
    >
      {/* FILTER BUTTONS (STATIC ONLY) */}
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

      {/* ROOMS GRID (STATIC DATA) */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-3">
        
        <div className="card-elevated p-4">
          <div className="flex items-start justify-between">
            <div className="font-display text-2xl text-primary">#101</div>
            <StatusPill status="available" />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Floor 1 · 2 guests
          </div>
          <div className="text-sm font-medium mt-2">Deluxe Room</div>
          <div className="text-sm text-accent font-semibold mt-1">
            {fmtMoney(120)}/night
          </div>
          <div className="mt-3 w-full text-xs bg-secondary border border-border rounded-md px-2 py-1.5">
            available
          </div>
        </div>

        <div className="card-elevated p-4">
          <div className="flex items-start justify-between">
            <div className="font-display text-2xl text-primary">#102</div>
            <StatusPill status="occupied" />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Floor 1 · 3 guests
          </div>
          <div className="text-sm font-medium mt-2">Suite</div>
          <div className="text-sm text-accent font-semibold mt-1">
            {fmtMoney(180)}/night
          </div>
          <div className="mt-3 w-full text-xs bg-secondary border border-border rounded-md px-2 py-1.5">
            occupied
          </div>
        </div>

        <div className="card-elevated p-4">
          <div className="flex items-start justify-between">
            <div className="font-display text-2xl text-primary">#103</div>
            <StatusPill status="cleaning" />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Floor 2 · 2 guests
          </div>
          <div className="text-sm font-medium mt-2">Standard Room</div>
          <div className="text-sm text-accent font-semibold mt-1">
            {fmtMoney(90)}/night
          </div>
          <div className="mt-3 w-full text-xs bg-secondary border border-border rounded-md px-2 py-1.5">
            cleaning
          </div>
        </div>

        <div className="card-elevated p-4">
          <div className="flex items-start justify-between">
            <div className="font-display text-2xl text-primary">#104</div>
            <StatusPill status="maintenance" />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Floor 2 · 4 guests
          </div>
          <div className="text-sm font-medium mt-2">Deluxe Room</div>
          <div className="text-sm text-accent font-semibold mt-1">
            {fmtMoney(140)}/night
          </div>
          <div className="mt-3 w-full text-xs bg-secondary border border-border rounded-md px-2 py-1.5">
            maintenance
          </div>
        </div>

        <div className="card-elevated p-4">
          <div className="flex items-start justify-between">
            <div className="font-display text-2xl text-primary">#105</div>
            <StatusPill status="available" />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Floor 3 · 2 guests
          </div>
          <div className="text-sm font-medium mt-2">Suite</div>
          <div className="text-sm text-accent font-semibold mt-1">
            {fmtMoney(200)}/night
          </div>
          <div className="mt-3 w-full text-xs bg-secondary border border-border rounded-md px-2 py-1.5">
            available
          </div>
        </div>

        <div className="card-elevated p-4">
          <div className="flex items-start justify-between">
            <div className="font-display text-2xl text-primary">#106</div>
            <StatusPill status="occupied" />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Floor 3 · 3 guests
          </div>
          <div className="text-sm font-medium mt-2">Standard Room</div>
          <div className="text-sm text-accent font-semibold mt-1">
            {fmtMoney(110)}/night
          </div>
          <div className="mt-3 w-full text-xs bg-secondary border border-border rounded-md px-2 py-1.5">
            occupied
          </div>
        </div>

      </div>
    </AppLayout>
  );
}