import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    transition: all 0.25s linear;
    @apply ${props => props.theme.body};
  }

  p {
    @apply ${props => props.theme.text};
  }
`;
