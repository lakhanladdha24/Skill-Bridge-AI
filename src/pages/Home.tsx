import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Globe } from 'lucide-react';

const Home: React.FC = () => {
    return (
        <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center">

            {/* Hero Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-4xl mx-auto space-y-8"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-primary mb-4 animate-pulse">
                    <Sparkles size={16} />
                    <span>AI-Powered Career Guidance</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
                    Skill Bridge <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary neon-text">AI</span>
                    <br />
                    <span className="text-4xl md:text-6xl text-gray-400 font-medium mt-2 block">
                        Bridging Skills to Careers
                    </span>
                </h1>

                <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Unlock your potential with our advanced AI-driven platform. tailored roadmaps, real-time skill tracking, and futuristic career insights.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                    <Link to="/skills">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 rounded-full bg-primary text-black font-bold text-lg flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-shadow"
                        >
                            <Zap size={20} />
                            Explore Skills
                        </motion.button>
                    </Link>

                    <Link to="/career-path">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg flex items-center gap-2 hover:bg-white/10 hover:border-white/20 transition-colors"
                        >
                            <Globe size={20} />
                            Generate Career Path
                        </motion.button>
                    </Link>
                </div>
            </motion.div>

            {/* Floating Elements Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white/5 rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            scale: Math.random() * 0.5 + 0.5,
                        }}
                        animate={{
                            y: [null, Math.random() * -100],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 5
                        }}
                        style={{
                            width: Math.random() * 4 + 2 + 'px',
                            height: Math.random() * 4 + 2 + 'px',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
