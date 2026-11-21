import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../../public/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
  padding: 2.4rem;

  @media (max-width: 37.5em) {
    grid-template-columns: minmax(0, 1fr);
    padding: 1.6rem;
  }
`;

function Login() {
  return <LoginLayout><Logo /><Heading as="h4">Log in to your account</Heading><LoginForm /></LoginLayout>;
}

export default Login;
