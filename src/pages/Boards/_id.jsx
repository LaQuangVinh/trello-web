import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { fetchBoardDetails_API } from '~/apis'


function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '65837ecfc2d927e73f24ff0c'
    fetchBoardDetails_API(boardId).then(board => setBoard(board))
  }, [])
  return (
    <Container disableGutters maxWidth = {false} sx={{ minHeight: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default Board