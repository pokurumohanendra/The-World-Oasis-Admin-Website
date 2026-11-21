import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  gap: 0.8rem;

  &:has(button) { margin-top: 1.2rem; }
`;
const Label = styled.label`font-weight: 500;`;
const Error = styled.span`font-size: 1.4rem; color: var(--color-red-700);`;

function FormRowVertical({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
