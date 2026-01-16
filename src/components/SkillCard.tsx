import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../data/skills';
import * as Icons from 'lucide-react';

interface SkillCardProps {
    skill: Skill;
    onClick?: (skill: Skill) => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, onClick }) => {
    // Dynamically get icon component
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (Icons as any)[skill.icon] || Icons.Code;

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="glass-card hover:border-primary/50 transition-all duration-300 cursor-pointer rounded-xl p-6 relative overflow-hidden group"
            onClick={() => onClick?.(skill)}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getLevelColor(skill.level)}`}>
                    {skill.level}
                </span>
            </div>

            <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{skill.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{skill.description}</p>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col gap-1 w-full mr-4">
                        <div className="flex justify-between text-xs text-gray-400">
                            <span>Popularity</span>
                            <span>{skill.popularity}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-700/50 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.popularity}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SkillCard;
