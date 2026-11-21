import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

:root {
  --color-brand-50: #f1f7f3;
  --color-brand-100: #dcece2;
  --color-brand-200: #b8d7c3;
  --color-brand-500: #477a59;
  --color-brand-600: #356447;
  --color-brand-700: #2a5039;
  --color-brand-800: #223f2f;
  --color-brand-900: #1b3327;
  --color-accent-500: #bd8435;

  --color-grey-0: #ffffff;
  --color-grey-50: #f7f7f3;
  --color-grey-100: #efefe8;
  --color-grey-200: #dedfd5;
  --color-grey-300: #c7c9bd;
  --color-grey-400: #989f96;
  --color-grey-500: #6f7871;
  --color-grey-600: #505b53;
  --color-grey-700: #354039;
  --color-grey-800: #26302a;
  --color-grey-900: #18201b;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;
  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e3eee6;
  --color-indigo-700: #356447;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(255, 255, 255, 0.1);

  --shadow-sm: 0 1px 3px rgba(27, 51, 39, 0.06);
  --shadow-md: 0 0.8rem 2.4rem rgba(27, 51, 39, 0.08);
  --shadow-lg: 0 2.4rem 4rem rgba(27, 51, 39, 0.16);

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

  --image-grayscale: 0;
  --image-opacity: 100%;
}

:root.dark-mode {
  --color-brand-50: #e8f3eb;
  --color-brand-100: #cde3d4;
  --color-brand-200: #9fc5ad;
  --color-brand-500: #6ca17d;
  --color-brand-600: #78ad88;
  --color-brand-700: #91bea0;
  --color-brand-800: #acd0b7;
  --color-brand-900: #c9e1d0;
  --color-accent-500: #dda955;
  --color-grey-0: #1b2520;
  --color-grey-50: #121a16;
  --color-grey-100: #27332c;
  --color-grey-200: #35443b;
  --color-grey-300: #4b5c52;
  --color-grey-400: #697970;
  --color-grey-500: #98a59d;
  --color-grey-600: #c1cbc4;
  --color-grey-700: #dce5df;
  --color-grey-800: #ebf0ed;
  --color-grey-900: #f6f8f6;
  --color-blue-100: #075985;
  --color-blue-700: #e0f2fe;
  --color-green-100: #166534;
  --color-green-700: #dcfce7;
  --color-yellow-100: #854d0e;
  --color-yellow-700: #fef9c3;
  --color-silver-100: #374151;
  --color-silver-700: #f3f4f6;
  --color-indigo-100: #244333;
  --color-indigo-700: #bce0c6;
  --backdrop-color: rgba(0, 0, 0, 0.3);
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.35);
  --shadow-md: 0 0.8rem 2.4rem rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 2.4rem 4rem rgba(0, 0, 0, 0.45);
  --image-grayscale: 10%;
  --image-opacity: 90%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
  overflow-x: hidden;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--color-grey-700);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
  background-color: var(--color-grey-50);
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

@media (max-width: 37.5em) {
  html { font-size: 56.25%; }
}
`;
export default GlobalStyle;
