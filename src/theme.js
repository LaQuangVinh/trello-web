import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '56px',
    boardBarHeight: '64px'
  },
  colorSchemes: {
  //   light: {
  //     palette: {
  //       primary: red,
  //       secondary: pink
  //     }
  //   },
  //   dark: {
  //     palette: {
  //       primary: cyan,
  //       secondary: orange
  //     }
  //   }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            borderRadius: '0px',
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            borderRadius: '4px',
            backgroundColor: 'rgba(22, 24, 35, .06)'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            borderRadius: '4px',
            backgroundColor: 'rgba(22, 24, 35, .1)'
          },
          '*::-webkit-scrollbar-track': {
            borderRadius: '0px',
            backgroundColor: 'rgba(0, 0, 0, 0)'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: {
          fontSize: '0.875rem'
        }
      }
    }
  }
})
export default theme