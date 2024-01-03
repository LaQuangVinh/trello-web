import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardFull from '~/components/Cards/CardFull'
import MenuExpand from '~/components/Menus/MenuExpand'
import { useSortable } from '@dnd-kit/sortable'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'

const HEADER_FOOTER_COLUMN_HEIGHT = '50px'

function BoardContentItem({ column, createNewCard, deleteColumnDetails }) {
  const [newCardTitle, setNewCardTitle] = useState('')

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)
  const handleAddNewCard = async () => {
    if (newCardTitle.length < 3) {
      toast.error('Nhập hơn 3 kí tự')
      return
    }

    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }

    createNewCard(newCardData)

    toggleOpenNewCardForm()
    setNewCardTitle('')
  }
  ////////////////////////////////////////////////

  const confirmDeleteColumn = useConfirm()
  const handleDeleteColumn =() => {
    confirmDeleteColumn({
      title: 'Delete column ?',
      description: 'Are you sure you want to delete ?'
    }).then(() => {
      deleteColumnDetails(column._id)
    }).catch(() => {

    })
  }

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

  const orderedCard = column?.cards
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
            '& .MuiSvgIcon-root': {
              color: 'var(--mui-palette-text-primary)'
            }
          }}>
          <Typography>{column?.title}</Typography>
          <MenuExpand toggleOpenNewCardForm={toggleOpenNewCardForm} handleDeleteColumn={handleDeleteColumn} />
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          p: '0 5px 5px 5px',
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

        <Box
          sx={{
            height: HEADER_FOOTER_COLUMN_HEIGHT,
            padding: '0px 10px 0px 10px',
            '& .MuiSvgIcon-root': {
              color: 'var(--mui-palette-text-primary)'
            }
          }}>
          {!openNewCardForm
            ?
            <Box
              onClick={toggleOpenNewCardForm}
              sx={{
                height: '100%',
                display: 'flex',
                justifyContent:'space-between',
                alignItems: 'center'
              }}
            >
              <Button startIcon={<AddCardIcon />} sx={{ color: 'var(--mui-palette-text-primary)' }}>
                <Typography>Add new card</Typography>
              </Button>
              <DragHandleIcon />
            </Box>
            :
            <Box sx={{
              borderRadius: '6px',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
              '& fieldset': {
                borderColor: (theme) => theme.palette.primary.main,
                borderRadius: '4px'
              },
              '& label': {
                color: (theme) => theme.palette.text.primary
              },
              '& label.Mui-focused': {
                color: (theme) => theme.palette.primary.main
              },
              '& input': {
                color: (theme) => theme.palette.text.primary,
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#84817a' : 'white'),
                borderRadius: '4px'
              },
              '.MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: (theme) => theme.palette.primary.main
                },
                '&.Mui-focused fieldset': {
                  borderColor: (theme) => theme.palette.primary.main
                }
              }
            }}>
              <TextField
                sx={{
                  minWidth: 120
                }}
                label="Enter card title"
                size="small"
                type='text'
                variant='outlined'
                autoFocus
                data-no-dnd='true'
                value={ newCardTitle }
                onChange={(e) => setNewCardTitle(e.target.value)}
              />
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                height: '100%'
              }}>
                <Button
                  onClick={handleAddNewCard}
                  variant='contained' color='success' size='small'
                  data-no-dnd='true'
                  sx={{
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: (theme) => theme.palette.success.main,
                    '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                  }}
                >
                  Add
                </Button>
                <CloseIcon
                  onClick={toggleOpenNewCardForm}
                  data-no-dnd='true'
                  fontSize='small'
                  sx={{ cursor: 'pointer', color: (theme) => theme.palette.warning.light, '&:hover': { opacity: '0.8' } }}
                />
              </Box>
            </Box>
          }
        </Box>

      </Box>
    </div>
  )
}

export default BoardContentItem