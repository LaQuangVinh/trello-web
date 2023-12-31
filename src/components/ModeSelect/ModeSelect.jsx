import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useColorScheme } from '@mui/material/styles'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import Box from '@mui/material/Box'

export default function ModeSelect() {
  // const [age, setAge] = React.useState('')
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    setMode(event.target.value)
  }

  return (
    <FormControl
      sx={{
        minWidth: 120,
        '& .Mui-focused': {
          borderColor: 'white',
          color: 'white',
          '& .MuiOutlinedInput-notchedOutline': {
            color: 'white',
            borderColor: 'white'
          }
        }
      }}
      size="small"
    >
      <InputLabel id="light-dark-mode-label">Mode</InputLabel>
      <Select
        labelId="light-dark-mode-label"
        id="light-dark-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{
          '& .MuiBox-root': {
            color: 'white'
          },
          '.MuiSvgIcon-root': {
            color: 'white'
          }
        }}
      >
        <MenuItem value={'light'}>
          <Box sx={{ display: 'flex', alignItems: 'center', color: (theme) => theme.palette.mode == 'light' ? '#2d3436' : 'white', gap: 0.5 }}>
            <LightModeIcon fontSize='small' />Light
          </Box>
        </MenuItem>
        <MenuItem value={'dark'}>
          <Box sx={{ display: 'flex', alignItems: 'center', color: (theme) => theme.palette.mode == 'light' ? '#2d3436' : 'white', gap: 0.5 }}>
            <DarkModeIcon fontSize='small' />Dark
          </Box>
        </MenuItem>
        <MenuItem value={'system'}>
          <Box sx={{ display: 'flex', alignItems: 'center', color: (theme) => theme.palette.mode == 'light' ? '#2d3436' : 'white', gap: 0.5 }}>
            <SettingsBrightnessIcon fontSize='small' />System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}