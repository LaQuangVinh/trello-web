import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import LinkIcon from '@mui/icons-material/Link'

export default function CardFull() {
  return (
    <Card sx={{ maxWidth: 345, overflow: 'unset' }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent sx={{
        paddingBottom: 0
      }}>
        <Typography>
          Lizard
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" startIcon={ <GroupIcon /> }>23</Button>
        <Button size="small" startIcon={ <CommentIcon /> }>22</Button>
        <Button size="small" startIcon={ <LinkIcon /> }>12</Button>
      </CardActions>
    </Card>
  )
}