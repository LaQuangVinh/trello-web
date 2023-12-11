import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

export default function IconChip({ children, Icon }) {
  return (
    <Stack sx={{ display: 'flex', alignItems: 'center' }} direction="row" spacing={1}>
      <Chip sx={{ color: 'primary.main', bgcolor: 'transparent' }} clickable icon={ Icon } label={children} />
    </Stack>
  )
}