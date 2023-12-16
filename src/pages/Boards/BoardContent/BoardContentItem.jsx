import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardFull from '~/components/Cards/CardFull'
import MenuExpand from '~/components/Menus/MenuExpand'
import { mapOrder } from '~/utils/sorts'
import { useSortable } from '@dnd-kit/sortable'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const HEADER_FOOTER_COLUMN_HEIGHT = '40px'

function BoardContentItem({ column }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })

  const dndKitColumnStyles = {
    //touchAction: 'none', dòng này là để fix 1 chút lỗi khi kéo thả trên mobile (dùng cho PointerSenesor)
    transform: CSS.Translate.toString(transform), //default trên doc là CSS.Transform.toString(transform) nhưng dùng thế nó sẽ bị stretch
    transition,
    height: '100%',
    opacity: isDragging ? '0.5' : undefined
  }

  const orderedCard = mapOrder(column?.cards, column?.cardOrderIds, '_id')
  return (
    <div
      ref={setNodeRef}
      style={dndKitColumnStyles}
      {...attributes}
    >
      <Box
        {...listeners}
        sx={{
          bgcolor: (theme) => theme.palette.mode == 'light' ? '#55efc4' : '#84817a',
          width: '300px',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} )`,
          borderRadius: 1
        }}>

        <Box
          sx={{
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
          <Typography>{column?.title}</Typography>
          <MenuExpand />
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          p: '0 5px',
          m: '0 5px',
          overflowX: 'hidden',
          overflowY: 'auto !important',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${HEADER_FOOTER_COLUMN_HEIGHT} - ${HEADER_FOOTER_COLUMN_HEIGHT})`,
          '& .MuiCardContent-root:last-child': {
            p: 1.5
          }
        }}>
          <SortableContext items={orderedCard.map(c => c?._id)} strategy={verticalListSortingStrategy}>
            {orderedCard?.map(card => <CardFull key={card?._id} card={card} />)}
          </SortableContext>
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
    </div>
  )
}

export default BoardContentItem