import styled from "styled-components";
import Logo from "../../public/Logo";
import MainNav from "./MainNav";
const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 56.25em) {
    grid-row: 2;
    padding: 0.8rem 2.4rem;
    border-right: 0;
    border-bottom: 1px solid var(--color-grey-100);
    overflow-x: auto;

    & > div:first-child { display: none; }
  }

  @media (max-width: 37.5em) { padding-inline: 1.2rem; }
`;

function SlideBar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default SlideBar;
