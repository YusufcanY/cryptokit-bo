import { Button, Typography, Container, Box } from '@mui/material'

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Home
        </Typography>
        <Button variant="contained" color="primary">
          Test Button
        </Button>
      </Box>
    </Container>
  )
}
