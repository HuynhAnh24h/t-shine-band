import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import MemberDetail from './pages/MemberDetail'
import AOS from "aos";
import "aos/dist/aos.css";
import Members from './pages/Member'

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });
  }, []);
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/member' element={<Members />} />
        <Route path='/member/:slug' element={<MemberDetail />} />
      </Route>
    </Routes>
  )
}

export default App
