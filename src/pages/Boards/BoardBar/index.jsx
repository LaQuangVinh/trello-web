import Box from '@mui/material/Box'
// import theme from './theme'

export default function BoardBar( { children } ) {
  return (
    <>
      <Box sx={{
        height: (theme) => theme.trello.boardBarHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'primary.light'
      }}>
        BoardBar
      </Box>
    </>
  )
}