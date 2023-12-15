import Box from '@mui/material/Box'
import BoardContentItem from './BoardContentItem'
import IconChip from '~/components/Chips/IconChip'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import { mapOrder } from '~/utils/sorts'

export default function BoardContent({ board }) {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  return (
    <>
      <Box sx={{
        height: (theme) => theme.trello.boardContentHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        padding: 2,
        backgroundColor: (theme) => theme.palette.mode == 'light' ? '#00a8ff' : '#2d3436',
        overflowX: 'auto',
        overflowY: 'hidden',
        gap: 2,
        '& .MuiStack-root': {
          alignItems: 'flex-start',
          '& .MuiChip-root': {
            bgcolor: '#ffffff3d'
          }
        }
      }}>
        {orderedColumns?.map(column => <BoardContentItem key={column._id} column={column} />)}
        <IconChip Icon={ <PlaylistAddIcon /> }>
            Add New Column
        </IconChip>
      </Box>
    </>
  )
}