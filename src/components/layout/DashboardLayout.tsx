import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'
import Sidebar, { DrawerHeader } from './Sidebar'
import { useState, useEffect } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

export default function DashboardLayout() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpenState, setMobileOpen] = useState(false)

  const mobileOpen = isMobile && mobileOpenState

  const [open, setOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen')
    return saved !== null ? saved === 'true' : true
  })

  useEffect(() => {
    localStorage.setItem('sidebarOpen', String(open))
  }, [open])

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen)
    } else {
      setOpen(!open)
    }
  }

  const handleDrawerClose = () => {
    if (isMobile) {
      setMobileOpen(false)
    } else {
      setOpen(false)
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar open={!isMobile && open} onDrawerToggle={handleDrawerToggle} />
      <Sidebar
        open={!isMobile && open}
        mobileOpen={mobileOpen}
        isMobile={isMobile}
        onDrawerClose={handleDrawerClose}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          bgcolor: 'background.default',
          minHeight: '100vh',
          minWidth: 0,
          width: isMobile ? '100%' : `calc(100% - ${open ? 240 : 65}px)`,
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  )
}
