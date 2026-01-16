export interface Milestone {
    id: string;
    title: string;
    description: string;
    duration: string;
    resources: string[];
}

export interface CareerPath {
    id: string;
    title: string;
    description: string;
    matchScore: number;
    milestones: Milestone[];
}

export const careerPaths: Record<string, CareerPath> = {
    'frontend': {
        id: 'cp_frontend',
        title: 'Frontend Developer',
        description: 'Build beautiful and interactive user interfaces for the web.',
        matchScore: 92,
        milestones: [
            {
                id: 'm1',
                title: 'HTML & CSS Basics',
                description: 'Master the building blocks of the web.',
                duration: '2 weeks',
                resources: ['MDN Web Docs', 'FreeCodeCamp']
            },
            {
                id: 'm2',
                title: 'JavaScript Fundamentals',
                description: 'Learn logic, DOM manipulation, and ES6+ features.',
                duration: '4 weeks',
                resources: ['Javascript.info', 'Eloquent JavaScript']
            },
            {
                id: 'm3',
                title: 'React & Ecosystem',
                description: 'Component-based architecture, hooks, and state management.',
                duration: '6 weeks',
                resources: ['React Documentation', 'Epic React']
            }
        ]
    },
    'backend': {
        id: 'cp_backend',
        title: 'Backend Engineer',
        description: 'Power the applications with robust server-side logic and databases.',
        matchScore: 88,
        milestones: [
            {
                id: 'm1',
                title: 'Language Mastery (Node/Python)',
                description: 'Deep dive into a server-side language.',
                duration: '4 weeks',
                resources: []
            },
            {
                id: 'm2',
                title: 'API Design',
                description: 'RESTful services, GraphQL, and authentication.',
                duration: '3 weeks',
                resources: []
            },
            {
                id: 'm3',
                title: 'Databases',
                description: 'SQL vs NoSQL, schema design, and ORMs.',
                duration: '5 weeks',
                resources: []
            }
        ]
    },
    'ai': {
        id: 'cp_ai',
        title: 'AI Engineer',
        description: 'Develop intelligent systems using machine learning and deep learning.',
        matchScore: 95,
        milestones: [
            {
                id: 'm1',
                title: 'Mathematics for ML',
                description: 'Linear algebra, calculus, and statistics.',
                duration: '6 weeks',
                resources: []
            },
            {
                id: 'm2',
                title: 'Python & Data Analysis',
                description: 'NumPy, Pandas, and Matplotlib mastery.',
                duration: '4 weeks',
                resources: []
            },
            {
                id: 'm3',
                title: 'Deep Learning',
                description: 'Neural networks, TensorFlow/PyTorch, and NLP.',
                duration: '8 weeks',
                resources: []
            }
        ]
    }
};
