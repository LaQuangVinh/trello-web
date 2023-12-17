import Box from '@mui/material/Box'
import BoardContentItem from './BoardContentItem'
import IconChip from '~/components/Chips/IconChip'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import { mapOrder } from '~/utils/sorts'
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay, defaultDropAnimationSideEffects, closestCorners } from '@dnd-kit/core' //PointerSensor lười thì dùng cái này cho nhanh
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
// import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { changeLocationArray } from '~/utils/sorts'
import CardFull from '~/components/Cards/CardFull'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_IEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

export default function BoardContent({ board }) {

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

  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumnsState(orderedColumns)

  }, [board])

  const findColumnById = (id) => {
    return orderedColumnsState.find(c => c?.cards.map(card => card._id)?.includes(id))
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
          nextActiveColumn.cards = nextActiveColumn.cards.filter(column => column._id !== activeDraggingCardId)
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(column => column._id)
        }

        if (nextOverColumn) {
          nextOverColumn.cards = nextOverColumn.cards.filter(column => column._id !== activeDraggingCardId) //code theo TrungQuanDev chứ dòng này cũng chưa biết để làm gì

          const reBuild_activeDraggingCardData = {

            ...activeDraggingCardData,
            columnId: overColumn._id

          }

          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, reBuild_activeDraggingCardData)
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(column => column._id)
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
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over

      //tìm column
      const overColumn = findColumnById(overCardId)
      const activeColumn = findColumnById(activeDraggingCardId)
      if (!activeColumn || !overColumn) return

      //kéo thả giữa 2 cột
      if ( oldColumnWhenDragging._id !== overColumn._id) {
        const oldCardIndex = oldColumnWhenDragging?.cards.findIndex(r => r._id === activeDragId)
        const newCardIndex = overColumn?.cards.findIndex(r => r._id === overCardId)
        const dndOrderCards = changeLocationArray(overColumn?.cards, newCardIndex, oldCardIndex)
        setOrderedColumnsState(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)
          const targetColumn = nextColumns.find(r => r._id === overColumn._id)
          // update vị trí card trong column sau khi thả
          if (targetColumn) {
            targetColumn.cards = dndOrderCards
            targetColumn.cardOrderIds = dndOrderCards.map(column => column._id)
          }
          return nextColumns
        })

        // kéo thả trong 1 cột
      } else {
        const oldCardIndex = oldColumnWhenDragging?.cards.findIndex(r => r._id === activeDragId)
        const newCardIndex = overColumn?.cards.findIndex(r => r._id === overCardId)
        const dndOrderCards = changeLocationArray(oldColumnWhenDragging?.cards, newCardIndex, oldCardIndex)

        setOrderedColumnsState(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)
          const targetColumn = nextColumns.find(r => r._id === overColumn._id)

          // update vị trí card trong column sau khi thả
          if (targetColumn) {
            targetColumn.cards = dndOrderCards
            targetColumn.cardOrderIds = dndOrderCards.map(column => column._id)
          }
          return nextColumns
        })
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

  return (
    <DndContext collisionDetection={closestCorners} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} sensors={sensors}>
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
          {orderedColumnsState?.map(column => <BoardContentItem key={column._id} column={column} />)}
          <IconChip Icon={ <PlaylistAddIcon /> }>
              Add New Column
          </IconChip>
          <DragOverlay dropAnimation={dropAnimation}>
            {activeDragType === ACTIVE_DRAG_IEM_TYPE.COLUMN ?
              <BoardContentItem column={activeDragData} /> :
              <CardFull card={activeDragData} />
            }
          </DragOverlay>
        </SortableContext>
      </Box>
    </DndContext>
  )
}