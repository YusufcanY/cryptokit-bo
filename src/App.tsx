import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import DashboardLayout from '@/components/layout/DashboardLayout'

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
