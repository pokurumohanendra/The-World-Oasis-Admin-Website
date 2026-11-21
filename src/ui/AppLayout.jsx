import styled from "styled-components";
import { Outlet } from "react-router-dom";
import SlideBar from "./SlideBar";
import Header from "./Header";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  @media (max-width: 56.25em) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;
  }
`;
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;

  @media (max-width: 75em) { padding: 3.2rem; }
  @media (max-width: 56.25em) { grid-row: 3; padding: 2.4rem; }
  @media (max-width: 37.5em) { padding: 1.6rem 1.2rem 4rem; }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 37.5em) { gap: 2.4rem; }
`;
function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <SlideBar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
