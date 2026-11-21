import styled from "styled-components";
import { HiArrowRightOnRectangle, HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../features/authentication/UserAvatar";
import ButtonIcon from "./ButtonIcon";
import { useLogout } from "../features/authentication/useLogout";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  min-width: 0;

  @media (max-width: 56.25em) { padding: 1rem 2.4rem; }
  @media (max-width: 37.5em) { padding-inline: 1.2rem; }
`;
const HeaderMenu = styled.ul`
  display: flex; gap: 0.4rem; align-items: center; justify-content: flex-end;
  @media (max-width: 37.5em) { & > li:first-child { margin-right: auto; } }
`;
function Header() {
  const navigate = useNavigate();
  const { logout, isLoggingOut } = useLogout();
  return <StyledHeader><HeaderMenu><li><UserAvatar /></li><li><ButtonIcon aria-label="Account" onClick={() => navigate("/account")}><HiOutlineUser /></ButtonIcon></li><li><DarkModeToggle /></li><li><ButtonIcon aria-label="Log out" disabled={isLoggingOut} onClick={logout}><HiArrowRightOnRectangle /></ButtonIcon></li></HeaderMenu></StyledHeader>;
}

export default Header;
