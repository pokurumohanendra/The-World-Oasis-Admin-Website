import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useEffect, useState } from "react";
import { useBooking } from "../bookings/useBooking";
import { useSettings } from "../settings/useSetting";
import { useCheckin } from "./useCheckin";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  @media (max-width: 37.5em) { padding: 2rem 1.6rem; }
`;

function CheckinBooking() {
  const moveBack = useMoveBack();

  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { checkin, isCheckingIn } = useCheckin();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);
  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests: { fullName: guestName },
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice = settings.breakfastPrice * numNights * numGuests;
  function handleCheckin() {
    if (!confirmPaid) return;
    checkin({ bookingId, breakfast: addBreakfast ? { hasBreakfast: true, extrasPrice: optionalBreakfastPrice, totalPrice: totalPrice + optionalBreakfastPrice } : {} });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        {!hasBreakfast && <Checkbox id="breakfast" checked={addBreakfast} onChange={() => { setAddBreakfast((value) => !value); setConfirmPaid(false); }}>
          Add breakfast for {formatCurrency(optionalBreakfastPrice)}?
        </Checkbox>}
      </Box>
      <Box>
        <Checkbox id="confirm" checked={confirmPaid} disabled={confirmPaid || isCheckingIn} onChange={() => setConfirmPaid((value) => !value)}>
          I confirm that {guestName} has paid {formatCurrency(totalPrice + (addBreakfast ? optionalBreakfastPrice : 0))}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
