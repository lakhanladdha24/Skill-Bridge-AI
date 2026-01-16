import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Skills from './pages/Skills'
import CareerPath from './pages/CareerPath'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'

const App: React.FC = () => {
    return (
        <Router>
            <div className="min-h-screen bg-background relative overflow-hidden">
                {/* Background Gradients */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 font-sans">
                    <Navbar />
                    <main className="container mx-auto px-4 py-8">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/skills" element={<Skills />} />
                            <Route path="/career-path" element={<CareerPath />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    )
}

export default App
