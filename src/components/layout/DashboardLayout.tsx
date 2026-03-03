import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar, { DrawerHeader } from './Sidebar';
import { useState, useEffect } from 'react';

export default function DashboardLayout() {
  const [open, setOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved !== null ? saved === 'true' : true;
  });

  useEffect(() => {
    localStorage.setItem('sidebarOpen', String(open));
  }, [open]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar open={open} onDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} onDrawerClose={handleDrawerClose} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f8fafc', minHeight: '100vh' }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
