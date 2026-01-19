import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BrainCircuit, LayoutDashboard, Map, Library } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/', icon: BrainCircuit },
        { name: 'Skills', path: '/skills', icon: Library },
        { name: 'Career Path', path: '/career-path', icon: Map },
        { name: 'Skill Test', path: '/skill-test', icon: BrainCircuit }, // Added Skill Test link with BrainCircuit icon
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-black/60 border-b border-white/5">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-primary bg-[length:200%_200%] animate-gradient-xy group-hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-shadow duration-300">
                        <BrainCircuit className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Skill<span className="text-primary">Bridge</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive ? 'text-primary' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {item.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                                    />
                                )}
                            </Link>
                        );
                    })}

                    <button className="px-5 py-2 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                        Sign In
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-300 hover:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            <motion.div
                initial={false}
                animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden bg-black/90 backdrop-blur-xl border-b border-white/5"
            >
                <div className="px-6 py-4 space-y-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 py-2 text-base font-medium ${isActive ? 'text-primary' : 'text-gray-400'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </motion.div>
        </nav>
    );
};

export default Navbar;
