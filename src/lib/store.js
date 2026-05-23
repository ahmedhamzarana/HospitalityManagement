import { useSyncExternalStore } from "react";

const id = () => Math.random().toString(36).slice(2, 10);
const today = new Date();
const addDays = (n) => {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};

const rooms = [];
const types = [
  { t: "Standard", rate: 180, cap: 2 },
  { t: "Deluxe", rate: 320, cap: 3 },
  { t: "Suite", rate: 580, cap: 4 },
  { t: "Presidential", rate: 1200, cap: 6 },
];
const statuses = ["available", "occupied", "cleaning", "maintenance"];
for (let f = 1; f <= 5; f++) {
  for (let r = 1; r <= 8; r++) {
    const tType = types[(f + r) % types.length];
    rooms.push({
      id: id(),
      number: `${f}${r.toString().padStart(2, "0")}`,
      type: tType.t,
      floor: f,
      rate: tType.rate,
      capacity: tType.cap,
      status: statuses[(f * r) % statuses.length],
    });
  }
}

const guests = [
  { id: id(), name: "Eleanor Whitmore", email: "eleanor@example.com", phone: "+1 415 555 0142", vip: true, joined: "2023-04-12", preferences: "High floor, sparkling water" },
  { id: id(), name: "Rajeev Kapoor", email: "rkapoor@example.com", phone: "+91 98200 12345", vip: true, joined: "2022-11-03", preferences: "Late check-out" },
  { id: id(), name: "Sofia Marchetti", email: "sofia.m@example.com", phone: "+39 320 555 8821", vip: false, joined: "2024-02-19" },
  { id: id(), name: "James O'Connor", email: "jamesoc@example.com", phone: "+44 20 7946 0033", vip: false, joined: "2024-06-30" },
  { id: id(), name: "Yuki Tanaka", email: "yuki.t@example.com", phone: "+81 3 5555 9912", vip: true, joined: "2021-08-22", preferences: "Tatami slippers" },
  { id: id(), name: "Amara Okafor", email: "amara.o@example.com", phone: "+234 802 555 4410", vip: false, joined: "2025-01-11" },
];

const reservations = [
  { id: id(), guestId: guests[0].id, roomId: rooms[3].id, checkIn: addDays(-1), checkOut: addDays(3), status: "checked-in", total: rooms[3].rate * 4, createdAt: addDays(-7) },
  { id: id(), guestId: guests[1].id, roomId: rooms[10].id, checkIn: addDays(2), checkOut: addDays(6), status: "confirmed", total: rooms[10].rate * 4, createdAt: addDays(-3) },
  { id: id(), guestId: guests[2].id, roomId: rooms[7].id, checkIn: addDays(-5), checkOut: addDays(-1), status: "checked-out", total: rooms[7].rate * 4, createdAt: addDays(-10) },
  { id: id(), guestId: guests[3].id, roomId: rooms[15].id, checkIn: addDays(1), checkOut: addDays(4), status: "confirmed", total: rooms[15].rate * 3, createdAt: addDays(-2) },
  { id: id(), guestId: guests[4].id, roomId: rooms[20].id, checkIn: addDays(-3), checkOut: addDays(2), status: "checked-in", total: rooms[20].rate * 5, createdAt: addDays(-9) },
  { id: id(), guestId: guests[5].id, roomId: rooms[5].id, checkIn: addDays(5), checkOut: addDays(8), status: "confirmed", total: rooms[5].rate * 3, createdAt: addDays(-1) },
];

const staff = [
  { id: id(), name: "Alex Morgan", email: "alex.m@luxurystay.com", role: "manager", active: true },
  { id: id(), name: "Priya Shah", email: "priya.s@luxurystay.com", role: "receptionist", active: true },
  { id: id(), name: "Diego Alvarez", email: "diego.a@luxurystay.com", role: "receptionist", active: true },
  { id: id(), name: "Mei Chen", email: "mei.c@luxurystay.com", role: "housekeeping", active: true },
  { id: id(), name: "Tomasz Nowak", email: "tomasz.n@luxurystay.com", role: "housekeeping", active: true },
  { id: id(), name: "Henrik Olsen", email: "henrik.o@luxurystay.com", role: "maintenance", active: false },
];

const tasks = [
  { id: id(), roomId: rooms[2].id, type: "cleaning", assignee: "Mei Chen", status: "in-progress", createdAt: addDays(0) },
  { id: id(), roomId: rooms[6].id, type: "cleaning", assignee: "Tomasz Nowak", status: "pending", createdAt: addDays(0) },
  { id: id(), roomId: rooms[11].id, type: "maintenance", assignee: "Henrik Olsen", status: "pending", note: "AC not cooling", createdAt: addDays(-1) },
  { id: id(), roomId: rooms[18].id, type: "cleaning", assignee: "Mei Chen", status: "done", createdAt: addDays(-1) },
];

const invoices = reservations
  .filter((r) => r.status === "checked-out" || r.status === "checked-in")
  .map((r) => {
    const items = [
      { label: "Room charges", amount: r.total },
      { label: "Mini bar", amount: 48 },
      { label: "Spa services", amount: 180 },
    ];
    const sub = items.reduce((s, i) => s + i.amount, 0);
    const tax = Math.round(sub * 0.12);
    return { id: id(), reservationId: r.id, items, tax, total: sub + tax, issued: r.checkIn, paid: r.status === "checked-out" };
  });

const feedback = [
  { id: id(), guestId: guests[0].id, rating: 5, comment: "Impeccable service, the suite views were breathtaking.", date: addDays(-2) },
  { id: id(), guestId: guests[2].id, rating: 4, comment: "Lovely stay. Breakfast could include more vegan options.", date: addDays(-4) },
  { id: id(), guestId: guests[4].id, rating: 5, comment: "Concierge went above and beyond. Will return.", date: addDays(-6) },
  { id: id(), guestId: guests[3].id, rating: 3, comment: "Room was clean but check-in took too long.", date: addDays(-8) },
];

const state = {
  rooms, guests, reservations, staff, tasks, invoices, feedback,
  settings: { hotelName: "LuxuryStay Hospitality", taxRate: 12, currency: "USD" },
};

const listeners = new Set();
const notify = () => listeners.forEach((l) => l());

export const store = {
  get: () => state,
  subscribe: (l) => { listeners.add(l); return () => listeners.delete(l); },
  updateRoomStatus(roomId, status) {
    const r = state.rooms.find((x) => x.id === roomId);
    if (r) r.status = status;
    notify();
  },
  addReservation(res) {
    state.reservations.unshift({ ...res, id: id(), createdAt: new Date().toISOString().slice(0, 10) });
    notify();
  },
  setReservationStatus(rid, status) {
    const r = state.reservations.find((x) => x.id === rid);
    if (r) r.status = status;
    notify();
  },
  addGuest(g) {
    state.guests.unshift({ ...g, id: id(), joined: new Date().toISOString().slice(0, 10) });
    notify();
  },
  addStaff(s) {
    state.staff.unshift({ ...s, id: id() });
    notify();
  },
  toggleStaff(sid) {
    const s = state.staff.find((x) => x.id === sid);
    if (s) s.active = !s.active;
    notify();
  },
  setTaskStatus(tid, status) {
    const t = state.tasks.find((x) => x.id === tid);
    if (t) t.status = status;
    notify();
  },
  addTask(t) {
    state.tasks.unshift({ ...t, id: id(), createdAt: new Date().toISOString().slice(0, 10) });
    notify();
  },
  addFeedback(f) {
    state.feedback.unshift({ ...f, id: id(), date: new Date().toISOString().slice(0, 10) });
    notify();
  },
  markInvoicePaid(iid) {
    const i = state.invoices.find((x) => x.id === iid);
    if (i) i.paid = true;
    notify();
  },
  updateSettings(s) {
    state.settings = { ...state.settings, ...s };
    notify();
  },
};

export function useStore(selector) {
  return useSyncExternalStore(store.subscribe, () => selector(state), () => selector(state));
}

export const fmtMoney = (n, c = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: c, maximumFractionDigits: 0 }).format(n);
