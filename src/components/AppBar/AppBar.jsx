import { useState } from 'react'
import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
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
import AddIcon from '@mui/icons-material/Add'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

export default function AppBar() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <>
      <Box px={ 2 } sx={{
        bgcolor: (theme) => theme.palette.mode == 'light' ? '#00a8ff' : '#2d3436',
        height: (theme) => theme.trello.appBarHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        overflowX: 'auto'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AppsIcon />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>

            <AutoAwesomeMosaicIcon />

            <Typography variant="span" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              Trello
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
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
            <Button sx={{ color: 'white', borderColor: 'transparent', '&:hover': { borderColor: 'transparent' } }} variant="outlined" startIcon={<AddIcon />}>Create</Button>
          </Box>

        </Box>

        <Box sx={{
          '& fieldset': {
            borderColor: 'white'
          },
          '& label': {
            color: 'white'
          },
          '& label.Mui-focused': {
            color: 'white'
          },
          '& input': {
            color: 'white'
          },
          '.MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: 'white'
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white'
            }
          },
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>

          <TextField
            sx={{
              minWidth: 120
            }}
            id="outlined-search" label="Search"
            size="small"
            value={ searchValue }
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <CloseIcon
                    onClick={() => setSearchValue('')}
                    fontSize='small'
                    sx={{ cursor: 'pointer', color: searchValue ? 'white' : (theme) => theme.palette.mode == 'light' ? '#00a8ff' : '#2d3436' }}
                  />
                </InputAdornment>
              )
            }}
          />

          <ModeSelect />

          <Tooltip title="Notification">
            <Badge color="warning" variant="dot" invisible={false}>
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