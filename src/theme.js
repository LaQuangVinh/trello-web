import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, blue, pink, orange } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: blue,
        secondary: pink
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      }
    }
  }
})
export default theme