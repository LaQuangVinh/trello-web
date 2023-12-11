import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect'

export default function AppBar() {
  return (
    <>
      <Box sx={{
        height: (theme) => theme.trello.appBarHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'primary.main'
      }}>
        <ModeSelect />
      </Box>
    </>
  )
}