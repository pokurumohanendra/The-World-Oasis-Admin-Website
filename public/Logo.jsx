import styled from "styled-components";
import { useDarkMode } from "../src/context/useDarkMode";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  return (
    <StyledLogo>
      <Img src={isDarkMode ? "/logo-dark.png" : "/logo-light.png"} alt="The Wild Oasis" />
    </StyledLogo>
  );
}

export default Logo;
