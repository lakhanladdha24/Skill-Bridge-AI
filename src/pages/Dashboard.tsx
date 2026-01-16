import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, TrendingUp, Clock, Zap, Sparkles } from 'lucide-react';
import { skills } from '../data/skills';

const Dashboard: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto pt-20 px-4 md:px-8">

            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-800 to-black border-4 border-primary/30 flex items-center justify-center overflow-hidden">
                        <User size={64} className="text-gray-600" />
                    </div>
                    <div className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-black border-4 border-black">
                        <Zap size={16} fill="currentColor" />
                    </div>
                </div>

                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold mb-2">Alex Voyager</h1>
                    <p className="text-gray-400 mb-4">Full Stack Developer • Level 5</p>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-sm">
                            <Clock size={14} className="text-primary" />
                            <span>240h Learned</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-sm">
                            <Award size={14} className="text-secondary" />
                            <span>12 Certs</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-sm">
                            <TrendingUp size={14} className="text-green-400" />
                            <span>Top 5%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Current Progress */}
                <div className="lg:col-span-2 space-y-8">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <TrendingUp className="text-primary" />
                        Current Progress
                    </h2>

                    <div className="space-y-4">
                        {['React Mastery', 'Advanced Node.js', 'System Design'].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-6 rounded-xl"
                            >
                                <div className="flex justify-between mb-2">
                                    <span className="font-semibold">{item}</span>
                                    <span className="text-primary text-sm font-mono">{85 - i * 15}%</span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary to-secondary"
                                        style={{ width: `${85 - i * 15}%` }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Recommended Skills */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Sparkles className="text-secondary" />
                        Recommended
                    </h2>

                    <div className="space-y-4">
                        {skills.slice(0, 3).map((skill) => (
                            <motion.div
                                key={skill.id}
                                whileHover={{ x: 5 }}
                                className="glass-card p-4 rounded-xl flex items-center gap-4 cursor-pointer hover:border-sidebar/50"
                            >
                                <div className="p-2 bg-white/5 rounded-lg">
                                    <Zap size={20} className="text-yellow-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold">{skill.name}</h4>
                                    <p className="text-xs text-gray-500">{skill.category}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
