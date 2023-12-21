import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import LinkIcon from '@mui/icons-material/Link'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'

export default function CardFull({ card }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card?._id,
    data: { ...card }
  })

  const dndKitCardStyles = {
    //touchAction: 'none', //dòng này là để fix 1 chút lỗi khi kéo thả trên mobile
    transform: CSS.Translate.toString(transform), //default trên doc là CSS.Transform.toString(transform) nhưng dùng thế nó sẽ bị stretch
    transition,
    opacity: isDragging ? '0.5' : undefined
  }
  const shouldShowCardAction = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }
  return (
    <Card
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
      sx={{
        maxWidth: 345,
        overflow: 'unset',
        display: card?.FE_PlaceholderCard ? 'none' : 'block'
      }}>
      {card?.cover &&
        <CardMedia
          sx={{ height: 140 }}
          image={card?.cover}
        />
      }
      <CardContent sx={{
        paddingBottom: 0
      }}>
        <Typography>
          {card?.title}
        </Typography>
      </CardContent>
      {shouldShowCardAction() &&
        <CardActions>
          {!!card?.memberIds.length && <Button size="small" startIcon={ <GroupIcon /> }>{card?.memberIds.length}</Button> }
          {!!card?.comments.length && <Button size="small" startIcon={ <CommentIcon /> }>{card?.comments.length}</Button> }
          {!!card?.attachments.length && <Button size="small" startIcon={ <LinkIcon /> }>{card?.attachments.length}</Button> }
        </CardActions>
      }
    </Card>
  )
}