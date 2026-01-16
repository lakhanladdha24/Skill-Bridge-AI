import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BrainCircuit, Rocket } from 'lucide-react';
import { careerPaths } from '../data/careerPaths';
import Roadmap from '../components/Roadmap';

const CareerPath: React.FC = () => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<keyof typeof careerPaths | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setLoading(true);
        setResult(null);

        // Simulate AI processing
        setTimeout(() => {
            const lowerInput = input.toLowerCase();
            let path: keyof typeof careerPaths = 'frontend'; // Default fallabck

            if (lowerInput.includes('back') || lowerInput.includes('server') || lowerInput.includes('db') || lowerInput.includes('data')) {
                path = 'backend';
            } else if (lowerInput.includes('ai') || lowerInput.includes('ml') || lowerInput.includes('robot') || lowerInput.includes('intelligen')) {
                path = 'ai';
            } else {
                path = 'frontend';
            }

            setResult(path);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto pt-20 px-4">
            <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary/20 to-secondary/20 mb-6 neon-border">
                    <BrainCircuit className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Career Architect</h1>
                <p className="text-xl text-gray-400">Tell us your interests, and our AI will build your perfect roadmap.</p>
            </div>

            <div className="max-w-2xl mx-auto mb-16">
                <form onSubmit={handleSubmit} className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-focus-within:opacity-75 transition duration-1000"></div>
                    <div className="relative flex items-center bg-black rounded-2xl p-2 border border-white/10">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="I want to build websites, robots, or mobile apps..."
                            className="flex-1 bg-transparent px-6 py-4 text-lg outline-none text-white placeholder-gray-600"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Generate</span>
                                    <Sparkles size={18} />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <AnimatePresence mode="wait">
                {result && !loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="pb-20"
                    >
                        <div className="flex items-center gap-4 mb-8 p-4 bg-primary/10 border border-primary/20 rounded-xl">
                            <Rocket className="text-primary" />
                            <p className="text-primary font-medium">Based on your interest in <span className="text-white font-bold">"{input}"</span>, we recommend:</p>
                        </div>

                        <Roadmap careerPath={careerPaths[result]} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CareerPath;
