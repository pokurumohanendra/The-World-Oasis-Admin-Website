import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import Heading from "../../ui/Heading";
import { useDarkMode } from "../../context/useDarkMode";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
  @media (max-width: 43.75em) { padding: 2rem 1.2rem; }
`;

const lightColors = {
      totalSales: { stroke: "#356447", fill: "#b8d7c3" },
      extrasSales: { stroke: "#bd8435", fill: "#f3dfbd" },
      text: "#354039",
      background: "#fff",
    };

function SalesChart({ bookings, numDays }) {
  bookings ??= [];
  const { isDarkMode } = useDarkMode();
  const colors = isDarkMode ? {
    totalSales: { stroke: "#78ad88", fill: "#356447" },
    extrasSales: { stroke: "#dda955", fill: "#7b5725" },
    text: "#dce5df", background: "#1b2520",
  } : lightColors;
  const allDates = eachDayOfInterval({ start: subDays(new Date(), numDays - 1), end: new Date() });
  const data = allDates.map((date) => ({
    label: format(date, "MMM dd"),
    totalSales: bookings.filter((booking) => isSameDay(date, new Date(booking.created_at))).reduce((sum, booking) => sum + booking.totalPrice, 0),
    extrasSales: bookings.filter((booking) => isSameDay(date, new Date(booking.created_at))).reduce((sum, booking) => sum + booking.extrasPrice, 0),
  }));
  return <StyledSalesChart>
    <Heading as="h2">Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash; {format(allDates.at(-1), "MMM dd yyyy")}</Heading>
    <ResponsiveContainer height={300} width="100%"><AreaChart data={data}>
      <XAxis dataKey="label" tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} />
      <YAxis unit="₹" tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} />
      <CartesianGrid strokeDasharray="4" />
      <Tooltip contentStyle={{ backgroundColor: colors.background }} />
      <Area dataKey="totalSales" type="monotone" stroke={colors.totalSales.stroke} fill={colors.totalSales.fill} name="Total sales" unit="₹" />
      <Area dataKey="extrasSales" type="monotone" stroke={colors.extrasSales.stroke} fill={colors.extrasSales.fill} name="Extras sales" unit="₹" />
    </AreaChart></ResponsiveContainer>
  </StyledSalesChart>;
}
export default SalesChart;
