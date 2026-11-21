import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import TodayActivity from "../check-in-out/TodayActivity";
import Stats from "./Stats";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
  @media (max-width: 75em) { grid-template-columns: repeat(2, 1fr); grid-template-rows: auto auto 34rem auto; }
  @media (max-width: 43.75em) { grid-template-columns: 1fr; grid-template-rows: auto; }
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoadingBookings, error: bookingsError } = useRecentBookings();
  const { confirmedStays, numDays, isLoading: isLoadingStays, error: staysError } = useRecentStays();
  const { cabins = [], isLoading: isLoadingCabins, error: cabinsError } = useCabins();
  if (isLoadingBookings || isLoadingStays || isLoadingCabins) return <Spinner />;
  if (bookingsError || staysError || cabinsError) throw bookingsError || staysError || cabinsError;
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length} />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
