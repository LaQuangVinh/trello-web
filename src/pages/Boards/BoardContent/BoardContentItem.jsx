import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MenuExpand from '~/components/Menus/MenuExpand'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Button from '@mui/material/Button'
import AddCardIcon from '@mui/icons-material/AddCard'
import CardFull from '~/components/Cards/CardFull'
import CardOnlyTitle from '~/components/Cards/CardOnlyTitle'

const HEADER_FOOTER_COLUMN_HEIGHT = '40px'

function BoardContentItem() {
  return (
    <Box sx={{
      bgcolor: (theme) => theme.palette.mode == 'light' ? '#55efc4' : '#84817a',
      width: '300px',
      maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} )`,
      borderRadius: 1
    }}>

      <Box sx={{
        display: 'flex',
        height: HEADER_FOOTER_COLUMN_HEIGHT,
        justifyContent:'space-between',
        alignItems: 'center',
        padding: '10px 10px 10px 10px',
        borderBottom:(theme) => theme.palette.mode == 'light' ? '1px solid rgba(0, 0, 0, 0.3)' : '1px solid rgba(255, 255, 255, 0.3)',
        '& .MuiSvgIcon-root': {
          color: 'var(--mui-palette-text-primary)'
        }
      }}>
        <Typography>Header</Typography>
        <MenuExpand />
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        p: '20px 5px',
        m: '0 5px',
        overflowX: 'hidden',
        overflowY: 'auto !important',
        maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${HEADER_FOOTER_COLUMN_HEIGHT} - ${HEADER_FOOTER_COLUMN_HEIGHT})`,
        '& .MuiCardContent-root:last-child': {
          p: 1.5
        }
      }}>
        <CardFull />
        <CardOnlyTitle />
        <CardOnlyTitle />
        <CardOnlyTitle />
        <CardOnlyTitle />
        <CardOnlyTitle />
        <CardOnlyTitle />
        <CardOnlyTitle />
        <CardOnlyTitle />
      </Box>

      <Box sx={{
        display: 'flex',
        height: HEADER_FOOTER_COLUMN_HEIGHT,
        justifyContent:'space-between',
        alignItems: 'center',
        padding: '10px 10px 10px 10px',
        borderTop:(theme) => theme.palette.mode == 'light' ? '1px solid rgba(0, 0, 0, 0.3)' : '1px solid rgba(255, 255, 255, 0.3)',
        '& .MuiSvgIcon-root': {
          color: 'var(--mui-palette-text-primary)'
        }
      }}>
        <Button startIcon={<AddCardIcon />} sx={{ color: 'var(--mui-palette-text-primary)' }}>
          <Typography>Footer</Typography>
        </Button>
        <DragHandleIcon />
      </Box>

    </Box>
  )
}

export default BoardContentItem