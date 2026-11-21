import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";
import { useNavigate } from "react-router-dom";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
  @media (max-width: 37.5em) {
    grid-template-columns: auto 2rem 1fr auto;
    gap: 0.8rem;
    & > div:nth-child(4) { display: none; }
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const navigate = useNavigate();
  const { id, status, numNights, guests: { fullName, nationality, countryFlag } } = activity;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
      <Guest>{fullName}</Guest>
      <div>{numNights} nights</div>
      {status === "unconfirmed" && <Button size="small" onClick={() => navigate(`/checkin/${id}`)}>Check in</Button>}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
