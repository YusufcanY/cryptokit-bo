import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from '@/pages/Home'
import DashboardLayout from '@/components/layout/DashboardLayout'

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
