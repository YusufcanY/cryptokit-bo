import { Box, Typography, Button, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: '70vh',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          borderRadius: 4,
          bgcolor: 'transparent',
        }}
      >
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 4,
            boxShadow: '0 8px 32px rgba(234, 255, 0, 0.3)',
          }}
        >
          <RocketLaunchIcon sx={{ fontSize: 60, color: 'common.black' }} />
        </Box>
        <Typography
          variant="h1"
          fontWeight="800"
          sx={{ mb: 1, fontSize: { xs: '4rem', md: '6rem' } }}
        >
          404
        </Typography>
        <Typography variant="h5" fontWeight="700" sx={{ mb: 2 }}>
          Page Not Found
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 400, lineHeight: 1.6 }}
        >
          The page you are looking for does not exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/')}
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: 600,
            color: 'common.black',
            textTransform: 'none',
            fontSize: '1.1rem',
          }}
        >
          Return to Dashboard
        </Button>
      </Paper>
    </Box>
  )
}
