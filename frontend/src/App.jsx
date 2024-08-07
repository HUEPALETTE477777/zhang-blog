import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar'
import Footer from './components/footer'

function App() {

  return (
    <>
      <div className="bg-primaryBG flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow"><Outlet/></div>

        <Footer />
      </div>
    </>
  )
}

export default App
