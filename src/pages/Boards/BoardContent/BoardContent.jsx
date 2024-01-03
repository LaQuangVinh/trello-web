import Box from '@mui/material/Box'
import BoardContentItem from './BoardContentItem'
import IconChip from '~/components/Chips/IconChip'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import { DndContext, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects, closestCorners, pointerWithin, getFirstCollision } from '@dnd-kit/core' //PointerSensor lười thì dùng cái này cho nhanh
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
// import { arrayMove } from '@dnd-kit/sortable' // bị thay thế bởi changeLocationArray vì có bug
import { useCallback, useEffect, useRef, useState } from 'react'
import { changeLocationArray } from '~/utils/sorts'
import CardFull from '~/components/Cards/CardFull'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatter'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import { MouseSensor, TouchSensor } from '~/customHooks/DndKitSensors'
import { toast } from 'react-toastify'

const ACTIVE_DRAG_IEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

export default function BoardContent({ board, createNewColumn, createNewCard, moveColumns, moveCardInTheSameColumn }) {
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
  const handleAddNewColumn = async () => {
    if (newColumnTitle.length < 3) {
      toast.error('Nhập hơn 3 kí tự')
      return
    }

    const newColumnData = {
      title: newColumnTitle
    }

    createNewColumn(newColumnData)

    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }
  ////////////////////////////////////////////////////////////////////////////////
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  //tolerance là dung sai cảm ửng ( phân biện tay và bút cảm ứng )
  //dùng mouseSensor và touchSensor thay vì chỉ dùng pointerSensor để kh bị bug trên mobile
  const touchSensor = useSensor(TouchSensor, { activationConstraint: {
    delay: 250,
    tolerance: 5
  } })

  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumnsState, setOrderedColumnsState] = useState([])

  //1 thời điểm chỉ kéo 1 cái => cần xác định _id
  const [activeDragId, setActiveDragId] = useState(null)
  const [activeDragType, setActiveDragType] = useState(null)
  const [activeDragData, setActiveDragData] = useState(null)
  const [oldColumnWhenDragging, setOldColumnWhenDragging] = useState(null)

  const lastOverId = useRef(null)

  useEffect(() => {
    setOrderedColumnsState(board?.columns)
  }, [board])

  const findColumnById = (id) => {
    return orderedColumnsState.find(c => c?.cards.map(card => card?._id)?.includes(id))
  }

  //trigger bắt đầu kéo
  const handleDragStart = (e) => {
    setActiveDragId(e?.active?.id)
    setActiveDragType(e?.active?.data?.current?.columnId ? ACTIVE_DRAG_IEM_TYPE.CARD : ACTIVE_DRAG_IEM_TYPE.COLUMN)
    setActiveDragData(e?.active?.data?.current)

    if (e?.active?.data?.current?.columnId) {
      setOldColumnWhenDragging(findColumnById(e?.active?.id))
    }
  }

  //trigger đang kéo
  const handleDragOver = (e) => {
    if (activeDragType === ACTIVE_DRAG_IEM_TYPE.COLUMN) return

    const { active, over } = e
    if (!over) return

    //tìm id card
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over

    //tìm column
    const overColumn = findColumnById(overCardId)
    const activeColumn = findColumnById(activeDraggingCardId)
    if (!activeColumn || !overColumn) return

    if ( activeColumn._id !== overColumn._id) {
      setOrderedColumnsState(prevColumns => {
        const overCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)

        //khúc này là để tìm vị trí mới cho card được kéo trong cột mới
        let newCardIndex
        const isBelowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards.length + 1

        //clone
        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        if (nextActiveColumn) {
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card?._id !== activeDraggingCardId)

          if (isEmpty(nextActiveColumn.cards)) {
            // card cuối cùng bị kéo đi
            nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
          }

          //Xoá cái placeholdersCard
          nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card?._id)
        }

        if (nextOverColumn) {
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card?._id !== activeDraggingCardId) //code theo TrungQuanDev chứ dòng này cũng chưa biết để làm gì

          const reBuild_activeDraggingCardData = {

            ...activeDraggingCardData,
            columnId: overColumn._id

          }

          // thêm card mới vào vị trí mới
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, reBuild_activeDraggingCardData)

          //update lại cái để sắp xếp card
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card?._id)
        }
        return nextColumns
      })
    }
  }

  //trigger kết thúc kéo
  const handleDragEnd = (e) => {
    const { active, over } = e

    if (!over) return

    // xử lí khi thả card
    if ( activeDragType === ACTIVE_DRAG_IEM_TYPE.CARD) {
      //tìm id card
      const { id: activeDraggingCardId } = active
      const { id: overCardId } = over

      //tìm column
      const overColumn = findColumnById(overCardId)
      const activeColumn = findColumnById(activeDraggingCardId)
      if (!activeColumn || !overColumn) return

      //kéo thả giữa 2 cột
      if ( oldColumnWhenDragging._id !== overColumn._id) {
        const oldCardIndex = oldColumnWhenDragging?.cards.findIndex(r => r?._id === activeDragId)
        const newCardIndex = overColumn?.cards.findIndex(r => r._id === overCardId)
        const dndOrderedCards = changeLocationArray(overColumn?.cards, newCardIndex, oldCardIndex)
        setOrderedColumnsState(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)
          const targetColumn = nextColumns.find(r => r._id === overColumn._id)
          // update vị trí card trong column sau khi thả
          if (targetColumn) {
            targetColumn.cards = dndOrderedCards
            targetColumn.cards= targetColumn.cards.filter(c => c !== undefined) //dòng này phát sinh khi gặp bug kéo card cuối cùng từ 1 column sang 1 column trống (dùng arrayToMove thì kh có bug này nhưng có bug loạn khi kéo thả)
            targetColumn.cardOrderIds = dndOrderedCards.map(column => column?._id)
          }
          return nextColumns
        })

        // kéo thả trong 1 cột
      } else {
        const oldCardIndex = oldColumnWhenDragging?.cards.findIndex(r => r._id === activeDragId)
        const newCardIndex = overColumn?.cards.findIndex(r => r._id === overCardId)

        const dndOrderedCards = changeLocationArray(oldColumnWhenDragging?.cards, newCardIndex, oldCardIndex)
        const dndOrderedCardIds = dndOrderedCards.map(column => column._id)

        setOrderedColumnsState(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)
          const targetColumn = nextColumns.find(r => r._id === overColumn._id)

          // update vị trí card trong column sau khi thả
          if (targetColumn) {
            targetColumn.cards = dndOrderedCards
            targetColumn.cardOrderIds = dndOrderedCardIds
          }
          return nextColumns
        })
        moveCardInTheSameColumn(dndOrderedCards, dndOrderedCardIds, oldColumnWhenDragging._id)
      }
    }


    // xử lí khi thả column
    if ( activeDragType === ACTIVE_DRAG_IEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        //lây index của 2 column đổi chỗ
        const oldColumnIndex = orderedColumnsState.findIndex(r => r._id === active.id)
        const newColumnIndex = orderedColumnsState.findIndex(r => r._id === over.id)
        const dndOrderColumns = changeLocationArray(orderedColumnsState, newColumnIndex, oldColumnIndex)

        setOrderedColumnsState(dndOrderColumns)

        moveColumns(dndOrderColumns)
      }
    }

    setActiveDragId(null)
    setActiveDragType(null)
    setActiveDragData(null)
    setOldColumnWhenDragging(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  const collisionDetectionStrategy = useCallback((args) => {
    if (activeDragType === ACTIVE_DRAG_IEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }

    // lấy ra các điểm va chạm
    const pointerIntersections = pointerWithin(args)

    if (!pointerIntersections.length) {
      return
    }

    // fix bug https://www.youtube.com/watch?v=a263JPw1iI0&t=587s
    // const intersections = !!pointerIntersections.length ? pointerIntersections : rectIntersection(args)

    let overId = getFirstCollision(pointerIntersections, 'id')

    const checkColumn = orderedColumnsState.find(column => column._id === overId)
    if (overId) {

      if (checkColumn) {
        // console.log('aaa', overId);
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => container._id !== overId && checkColumn?.cardOrderIds?.includes(container.id))
        })[0]?.id
        // console.log('bbb', overId);
      }
      lastOverId.current = overId
      return [{ id: overId }]
    }

    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragType, orderedColumnsState])

  return (
    <DndContext collisionDetection={collisionDetectionStrategy} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} sensors={sensors}>
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
        <SortableContext items={orderedColumnsState.map(c => c._id)} strategy={horizontalListSortingStrategy}>
          {orderedColumnsState?.map(column => <BoardContentItem key={column._id} column={column} createNewCard={createNewCard} />)}
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
            {!openNewColumnForm
              ?
              <Box onClick={toggleOpenNewColumnForm} >
                <IconChip sx={{ width: '255px', height: '40px', borderRadius: '8px' }} Icon={ <PlaylistAddIcon /> }>
                    Add New Column
                </IconChip>
                <DragOverlay dropAnimation={dropAnimation}>
                  {activeDragType === ACTIVE_DRAG_IEM_TYPE.COLUMN ?
                    <BoardContentItem column={activeDragData} /> :
                    <CardFull card={activeDragData} />
                  }
                </DragOverlay>
              </Box>
              :
              <>
                <Box sx={{
                  minWidth: '250px',
                  maxWidth: '250px',
                  mx: 2,
                  p: 1,
                  borderRadius: '6px',
                  height: 'fit-content',
                  bgcolor: '#ffffff3d',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}>
                  <TextField
                    sx={{
                      minWidth: 120
                    }}
                    label="Enter column title"
                    size="small"
                    type='text'
                    variant='outlined'
                    autoFocus
                    value={ newColumnTitle }
                    onChange={(e) => setNewColumnTitle(e.target.value)}
                  />
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <Button
                      onClick={handleAddNewColumn}
                      variant='contained' color='success' size='small'
                      sx={{
                        boxShadow: 'none',
                        border: '0.5px solid',
                        borderColor: (theme) => theme.palette.success.main,
                        '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                      }}
                    >
                      Add column
                    </Button>
                    <CloseIcon
                      onClick={toggleOpenNewColumnForm}
                      fontSize='small'
                      sx={{ cursor: 'pointer', color: 'white', '&:hover': { opacity: '0.8' } }}
                    />
                  </Box>
                </Box>
              </>
            }
          </Box>
        </SortableContext>
      </Box>
    </DndContext>
  )
}