import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, pink, orange, red } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '56px',
    boardBarHeight: '64px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: red,
        secondary: pink
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * {
           text-transform: none !important;
        }
      `
    }
  }
})
export default theme