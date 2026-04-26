import './App.css'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'

function App() {
  return(
   <div className="min-h-screen bg-gradient-to-r from-[#060b16] via-[#08101d] to-[#060b16] text-white">
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  )
}

export default App
