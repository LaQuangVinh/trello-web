import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { fetchBoardDetails_API } from '~/apis'
import { mockData } from '~/apis/mock-data'


function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '658fcd505a74a860bd2be57a'
    fetchBoardDetails_API(boardId).then(board => setBoard(board))
  }, [])
  return (
    <Container disableGutters maxWidth = {false} sx={{ minHeight: '100vh' }}>
      <AppBar />
      <BoardBar board={mockData.board} />
      <BoardContent board={mockData.board} />
    </Container>
  )
}

export default Board