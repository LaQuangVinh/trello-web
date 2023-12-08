import Button from '@mui/material/Button'
import { useColorScheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import ModeSelect from './ModeSelect'

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
}

function App() {

  return (
    <>
      <ModeSelect />
      <ModeToggle />
      <Button variant="contained">Hello world</Button>
      <Button variant="text">Hello world</Button>
      <Button variant="outline">Hello world</Button>
    </>
  )
}

export default App
