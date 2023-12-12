import Box from '@mui/material/Box'
import IconChip from '~/components/Chips/IconChip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

export default function BoardBar() {
  return (
    <>
      <Box sx={{
        height: (theme) => theme.trello.boardBarHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: 2,
        overflowX: 'auto',
        bgcolor: (theme) => theme.palette.mode == 'light' ? '#0984e3' : '#2c3e50'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconChip Icon={ <DashboardIcon /> }>
            vinh muốn học giỏi
          </IconChip>
          <IconChip Icon={ <VpnLockIcon /> }>
            Public/Private Workspaces
          </IconChip>
          <IconChip Icon={ <AddToDriveIcon /> }>
            Add To Google Drive
          </IconChip>
          <IconChip Icon={ <ElectricBoltIcon /> }>
            Automation
          </IconChip>
          <IconChip Icon={ <FilterListIcon /> }>
            Filters
          </IconChip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white' } }} variant="outlined" startIcon={<PersonAddIcon />}>Invite</Button>
          <AvatarGroup sx={{ '& .MuiAvatar-root': { height: '32px', width: '32px' } }} max={7}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
        </Box>
      </Box>
    </>
  )
}