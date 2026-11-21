import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_KEY,
);

const cabinImages = Array.from(
  { length: 8 },
  (_, index) =>
    `${process.env.VITE_SUPABASE_URL}/storage/v1/object/public/Cabin_images/cabin-${String(index + 1).padStart(3, "0")}.jpg`,
);

const cabinSeeds = Array.from({ length: 10 }, (_, index) => ({
  name: `Demo Cabin ${String(index + 1).padStart(2, "0")}`,
  maxCapacity: 2 + (index % 5) * 2,
  regularPrice: 3500 + index * 650,
  discount: index % 3 === 0 ? 500 + index * 50 : 0,
  description: `Comfortable demo cabin ${index + 1} with forest views and modern amenities.`,
  image: cabinImages[index % cabinImages.length],
}));

const guestSeeds = Array.from({ length: 20 }, (_, index) => ({
  fullname: `Demo Guest ${String(index + 1).padStart(2, "0")}`,
  email: `demo.guest.${String(index + 1).padStart(2, "0")}@example.com`,
  nationalID: `DEMO${String(index + 1).padStart(8, "0")}`,
  natinality: ["Indian", "American", "British", "Canadian", "Australian"][index % 5],
  countryFlag: [
    "https://flagcdn.com/in.svg",
    "https://flagcdn.com/us.svg",
    "https://flagcdn.com/gb.svg",
    "https://flagcdn.com/ca.svg",
    "https://flagcdn.com/au.svg",
  ][index % 5],
}));

async function requireResult(promise, label) {
  const result = await promise;
  if (result.error) throw new Error(`${label}: ${result.error.message}`);
  return result.data;
}

const existingCabins = await requireResult(
  supabase.from("Cabins").select("id,name"),
  "Read cabins",
);
const missingCabins = cabinSeeds.filter(
  (seed) => !existingCabins.some((cabin) => cabin.name === seed.name),
);
if (missingCabins.length)
  await requireResult(
    supabase.from("Cabins").insert(missingCabins).select(),
    "Insert cabins",
  );

const existingGuests = await requireResult(
  supabase.from("guests").select("id,email"),
  "Read guests",
);
const missingGuests = guestSeeds.filter(
  (seed) => !existingGuests.some((guest) => guest.email === seed.email),
);
if (missingGuests.length)
  await requireResult(
    supabase.from("guests").insert(missingGuests).select(),
    "Insert guests",
  );

const demoCabins = await requireResult(
  supabase.from("Cabins").select("id,name,regularPrice,discount").like("name", "Demo Cabin %").order("name"),
  "Read demo cabins",
);
const demoGuests = await requireResult(
  supabase.from("guests").select("id,email").like("email", "demo.guest.%@example.com").order("email"),
  "Read demo guests",
);
const demoGuestIds = demoGuests.map((guest) => guest.id);
const existingDemoBookings = demoGuestIds.length
  ? await requireResult(
      supabase.from("bookings").select("id,guestId").in("guestId", demoGuestIds),
      "Read demo bookings",
    )
  : [];

const bookingsNeeded = Math.max(0, 30 - existingDemoBookings.length);
const now = new Date();
const bookingSeeds = Array.from({ length: bookingsNeeded }, (_, index) => {
  const sequence = existingDemoBookings.length + index;
  const cabin = demoCabins[sequence % demoCabins.length];
  const guest = demoGuests[sequence % demoGuests.length];
  const start = new Date(now);
  start.setDate(start.getDate() + (sequence - 10) * 2);
  const numNights = 1 + (sequence % 7);
  const end = new Date(start);
  end.setDate(end.getDate() + numNights);
  const numGuests = 1 + (sequence % 4);
  const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
  const hasBreakfast = sequence % 2 === 0;
  const extrasPrice = hasBreakfast ? numNights * numGuests * 200 : 0;
  const totalPrice = cabinPrice + extrasPrice;
  const status = end < now ? "checked-out" : start <= now ? "checked-in" : "unconfirmed";
  return {
    start: start.toISOString(),
    endDate: end.toISOString(),
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    status,
    hasBreakfast,
    isPaid: status !== "unconfirmed" || sequence % 3 === 0,
    observations: sequence % 4 === 0 ? "Demo booking: guest may arrive early." : "",
    cabinId: cabin.id,
    guestId: guest.id,
  };
});

if (bookingSeeds.length)
  await requireResult(
    supabase.from("bookings").insert(bookingSeeds).select(),
    "Insert bookings",
  );

const counts = {};
for (const table of ["Cabins", "guests", "bookings", "settings"]) {
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });
  if (error) throw new Error(`Count ${table}: ${error.message}`);
  counts[table] = count;
}

console.log(JSON.stringify({ inserted: { cabins: missingCabins.length, guests: missingGuests.length, bookings: bookingSeeds.length }, totals: counts }, null, 2));
