export interface Skill {
    id: string;
    name: string;
    category: 'Frontend' | 'Backend' | 'AI/ML' | 'DevOps' | 'Design';
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    description: string;
    popularity: number; // 0-100
    icon: string;
}

export const skills: Skill[] = [
    {
        id: '1',
        name: 'React',
        category: 'Frontend',
        level: 'Intermediate',
        description: 'A JavaScript library for building user interfaces',
        popularity: 95,
        icon: 'Atom'
    },
    {
        id: '2',
        name: 'TypeScript',
        category: 'Frontend',
        level: 'Intermediate',
        description: 'JavaScript with syntax for types',
        popularity: 90,
        icon: 'FileCode'
    },
    {
        id: '3',
        name: 'Node.js',
        category: 'Backend',
        level: 'Advanced',
        description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine',
        popularity: 88,
        icon: 'Server'
    },
    {
        id: '4',
        name: 'Python',
        category: 'AI/ML',
        level: 'Beginner',
        description: 'A programming language that lets you work quickly and integrate systems more effectively',
        popularity: 98,
        icon: 'Code2'
    },
    {
        id: '5',
        name: 'Docker',
        category: 'DevOps',
        level: 'Intermediate',
        description: 'Set of platform as a service products that use OS-level virtualization to deliver software in packages called containers',
        popularity: 85,
        icon: 'Container'
    },
    {
        id: '6',
        name: 'Figma',
        category: 'Design',
        level: 'Beginner',
        description: 'A collaborative interface design tool',
        popularity: 80,
        icon: 'PenTool'
    },
    {
        id: '7',
        name: 'TensorFlow',
        category: 'AI/ML',
        level: 'Advanced',
        description: 'An end-to-end open source platform for machine learning',
        popularity: 75,
        icon: 'Brain'
    },
    {
        id: '8',
        name: 'Tailwind CSS',
        category: 'Frontend',
        level: 'Beginner',
        description: 'A utility-first CSS framework for rapidly building custom designs',
        popularity: 92,
        icon: 'Palette'
    }
];
