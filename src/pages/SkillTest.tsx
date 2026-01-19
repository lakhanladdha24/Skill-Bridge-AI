import React, { useState } from 'react';
import { skillTestQuestions, Question } from '../data/skillTestQuestions';

const SkillTest: React.FC = () => {
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [, setAnswers] = useState<Record<number, string>>({});
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const skills = ["AI", "Web Dev", "DSA", "Python"];

    const questions: Question[] = selectedSkill
        ? skillTestQuestions.filter((q) => q.skill === selectedSkill)
        : [];

    const handleAnswerSelect = (option: string) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        if (!selectedOption) return;

        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = selectedOption === currentQuestion.correctAnswer;

        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        setAnswers(prev => ({
            ...prev,
            [currentQuestionIndex]: selectedOption
        }));

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
        } else {
            setShowResult(true);
        }
    };

    const resetTest = () => {
        setSelectedSkill(null);
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResult(false);
        setAnswers({});
        setSelectedOption(null);
    };

    const getSkillLevel = (score: number) => {
        if (score <= 2) return "Beginner";
        if (score <= 4) return "Intermediate";
        return "Advanced";
    };

    const getRecommendation = (skill: string) => {
        switch (skill) {
            case "AI": return "Focus on Deep Learning and Reinforcement Learning next.";
            case "Web Dev": return "Try building a full-stack application with Next.js or Node.js.";
            case "DSA": return "Practice dynamic programming and graph algorithms.";
            case "Python": return "Learn about decorators, generators, and async programming.";
            default: return "Continue practicing to improve your skills.";
        }
    };

    if (!selectedSkill) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                    AI Skill Assessment Test
                </h1>
                <p className="text-gray-300 mb-8">
                    Select a skill to start your 5-question assessment. Test your knowledge and get instant feedback!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skill) => (
                        <div
                            key={skill}
                            onClick={() => setSelectedSkill(skill)}
                            className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
                        >
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                {skill}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                5 Questions • Mock AI Assessment
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (showResult) {
        const level = getSkillLevel(score);
        return (
            <div className="container mx-auto px-4 py-8 max-w-2xl text-center">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-xl shadow-2xl">
                    <h2 className="text-3xl font-bold text-white mb-4">Assessment Complete!</h2>

                    <div className="mb-8">
                        <span className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                            {score} / 5
                        </span>
                        <p className="text-gray-300 mt-2 text-xl">Your Score</p>
                    </div>

                    <div className="bg-white/5 rounded-lg p-6 mb-8 text-left">
                        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                            <span className="text-gray-400">Skill Level:</span>
                            <span className={`text-xl font-bold ${level === 'Advanced' ? 'text-green-400' : level === 'Intermediate' ? 'text-yellow-400' : 'text-blue-400'}`}>
                                {level}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-400 block mb-2">Recommendation:</span>
                            <p className="text-white italic">"{getRecommendation(selectedSkill)}"</p>
                        </div>
                    </div>

                    <button
                        onClick={resetTest}
                        className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/80 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Take Another Test
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="mb-6 flex justify-between items-center">
                <span className="text-gray-400 text-sm">Skill: <span className="text-white font-bold">{selectedSkill}</span></span>
                <span className="text-gray-400 text-sm">Question {currentQuestionIndex + 1} of {questions.length}</span>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-xl shadow-xl min-h-[400px] flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6 leading-relaxed">
                        {currentQuestion.question}
                    </h2>

                    <div className="space-y-4">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(option)}
                                className={`w-full text-left p-4 rounded-lg transition-all duration-200 border ${selectedOption === option
                                    ? 'bg-primary/20 border-primary text-white'
                                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/30'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <span className={`w-6 h-6 flex items-center justify-center rounded-full border mr-3 text-sm ${selectedOption === option ? 'border-primary bg-primary text-white' : 'border-gray-500'
                                        }`}>
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    {option}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleNextQuestion}
                        disabled={!selectedOption}
                        className={`py-3 px-8 rounded-full font-bold transition-all duration-300 ${selectedOption
                            ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg hover:shadow-primary/50 transform hover:-translate-y-1'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {currentQuestionIndex === questions.length - 1 ? 'Finish Test' : 'Next Question'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkillTest;
