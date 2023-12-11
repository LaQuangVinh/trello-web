import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic'
import Typography from '@mui/material/Typography'
import MenuExpand from '~/components/Menus/MenuExpand'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import AccountMenu from '~/components/Menus/AccountMenu'

export default function AppBar() {
  return (
    <>
      <Box px={ 2 } sx={{
        height: (theme) => theme.trello.appBarHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'primary.main'
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <AppsIcon sx={{}} />

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}>

            <AutoAwesomeMosaicIcon />

            <Typography variant="span" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              Trello
            </Typography>
          </Box>

          <MenuExpand>
            Workspaces
          </MenuExpand>
          <MenuExpand>
            Recent
          </MenuExpand>
          <MenuExpand>
            Starred
          </MenuExpand>
          <MenuExpand>
            Templates
          </MenuExpand>

          <Button variant="outlined">Create</Button>

        </Box>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>

          <TextField id="outlined-search" label="Search ..." type="search" size="small" />

          <ModeSelect />

          <Tooltip title="Notification">
            <Badge color="secondary" variant="dot" invisible={false}>
              <NotificationsNoneIcon />
            </Badge>
          </Tooltip>

          <Tooltip title="Help">
            <HelpOutlineIcon />
          </Tooltip>

          <AccountMenu />

        </Box>
      </Box>
    </>
  )
}