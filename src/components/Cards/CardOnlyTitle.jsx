import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export default function CardOnlyTitle() {
  return (
    <Card sx={{ maxWidth: 345, overflow: 'unset' }}>
      <CardContent>
        <Typography>
          Lizard
        </Typography>
      </CardContent>
    </Card>
  )
}