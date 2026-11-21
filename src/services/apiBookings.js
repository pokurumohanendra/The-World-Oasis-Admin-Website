import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

function normalizeGuest(guest) {
  if (!guest) return guest;
  return {
    ...guest,
    fullName: guest.fullName ?? guest.fullname,
    nationality: guest.nationality ?? guest.natinality,
  };
}

function normalizeBooking(booking) {
  if (!booking) return booking;
  return {
    ...booking,
    startDate: booking.startDate ?? booking.start,
    cabins: booking.cabins ?? booking.Cabins,
    guests: normalizeGuest(booking.guests),
  };
}

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select("*, Cabins(name), guests(fullname, email)", { count: "exact" });

  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);
  if (sortBy) {
    const databaseField = sortBy.field === "startDate" ? "start" : sortBy.field;
    query = query.order(databaseField, { ascending: sortBy.direction === "asc" });
  }
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    query = query.range(from, from + PAGE_SIZE - 1);
  }

  const { data, error, count } = await query;
  if (error) throw new Error("Bookings could not be loaded");
  return { data: data.map(normalizeBooking), count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, Cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return normalizeBooking(data);
}

export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullname)")
    .gte("start", date)
    .lte("start", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data.map(normalizeBooking);
}

export async function getStaysTodayActivity() {
  const todayStart = getToday();
  const todayEnd = getToday({ end: true });
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullname, natinality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,start.gte.${todayStart},start.lte.${todayEnd}),and(status.eq.checked-in,endDate.gte.${todayStart},endDate.lte.${todayEnd})`,
    )
    .order("created_at");


  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data.map(normalizeBooking);
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(`Booking could not be updated: ${error.message}`);
  }
  return data;
}

export async function deleteBooking(id) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
