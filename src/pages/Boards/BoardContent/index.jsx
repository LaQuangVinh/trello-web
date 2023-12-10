import Box from '@mui/material/Box'
// import theme from './theme'

export default function BoardContent() {
  return (
    <>
      <Box sx={{
        height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'primary.dark'
      }}>
        BoardContent
      </Box>
    </>
  )
}