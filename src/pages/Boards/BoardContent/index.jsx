import Box from '@mui/material/Box'
import BoardContentItem from './BoardContentItem'
// import theme from './theme'

export default function BoardContent() {
  return (
    <>
      <Box sx={{
        height: (theme) => theme.trello.boardContentHeight,
        width: '100%',
        display: 'flex',
        padding: 2,
        backgroundColor: (theme) => theme.palette.mode == 'light' ? '#00a8ff' : '#2d3436',
        overflowX: 'auto',
        overflowY: 'hidden',
        gap: 2
      }}>
        <BoardContentItem />
        <BoardContentItem />
        <BoardContentItem />
        <BoardContentItem />
        <BoardContentItem />
        <BoardContentItem />
        <BoardContentItem />
        <BoardContentItem />
        <BoardContentItem />
      </Box>
    </>
  )
}