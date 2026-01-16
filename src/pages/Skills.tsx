import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { skills } from '../data/skills';
import SkillCard from '../components/SkillCard';

const Skills: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = Array.from(new Set(skills.map(s => s.category)));

    const filteredSkills = skills.filter(skill => {
        const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            skill.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? skill.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="max-w-7xl mx-auto pt-20 pb-12">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Skill Matrix</h1>
                    <p className="text-gray-400">Explore the technologies shaping the future.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search skills..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-64 pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 text-white placeholder-gray-500 transition-all"
                        />
                    </div>

                    <div className="relative group hidden sm:block">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-8">
                <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === null
                        ? 'bg-primary text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                >
                    All
                </button>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                            ? 'bg-primary text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            {filteredSkills.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSkills.map((skill, index) => (
                        <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <SkillCard skill={skill} />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-500">
                    <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-xl">No skills found matching your criteria.</p>
                    <button
                        onClick={() => { setSearchTerm(''); setSelectedCategory(null); }}
                        className="mt-4 text-primary hover:underline"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default Skills;
