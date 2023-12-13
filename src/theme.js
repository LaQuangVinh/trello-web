import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '56px'
const BOARD_BAR_HEIGHT = '64px'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
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