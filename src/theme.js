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
        root: ({ theme }) => (
          {
            color: theme.palette.primary.main,
            fontSize: '0.875rem',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.light
            },
            '&:hover': {
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.dark
              }
            }
            // '& fieldset': {
            //   borderWidth: '1px !important'
            // }
          }
        )
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => (
          {
            color: theme.palette.primary.main
          }
        )
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => (
          {
            color: theme.palette.primary.main + '!important'
          }
        )
      }
    }
  }
})
export default theme