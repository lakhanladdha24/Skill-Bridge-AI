// Global variables
let currentSkills = [];
let selectedGoal = '';
let learningPath = [];
let currentQuizIndex = 0;
let quizData = [];
let quizScore = 0;
let userStats = {
    level: 1,
    xp: 0,
    streak: 0,
    goalsCompleted: 0
};

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }
});

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    themeIcon.className = 'fas fa-sun';
}

// Skills management
const skillInput = document.getElementById('skillInput');
const addSkillBtn = document.getElementById('addSkillBtn');
const skillsList = document.getElementById('skillsList');

function addSkill(skill) {
    if (skill && !currentSkills.includes(skill)) {
        currentSkills.push(skill);
        updateSkillsDisplay();
        skillInput.value = '';
    }
}

function removeSkill(skill) {
    currentSkills = currentSkills.filter(s => s !== skill);
    updateSkillsDisplay();
}

function updateSkillsDisplay() {
    skillsList.innerHTML = currentSkills.map(skill => `
        <span class="skill-badge text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
            ${skill}
            <button onclick="removeSkill('${skill}')" class="ml-2 hover:text-red-200">
                <i class="fas fa-times"></i>
            </button>
        </span>
    `).join('');
}

addSkillBtn.addEventListener('click', () => addSkill(skillInput.value.trim()));
skillInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addSkill(skillInput.value.trim());
});

// Career goal selection
document.querySelectorAll('.career-goal-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.career-goal-card').forEach(c => {
            c.classList.remove('border-green-500', 'bg-green-50', 'dark:bg-green-900/20');
        });
        card.classList.add('border-green-500', 'bg-green-50', 'dark:bg-green-900/20');
        selectedGoal = card.dataset.goal;
    });
});

// Skill gap analysis
const analyzeBtn = document.getElementById('analyzeBtn');
analyzeBtn.addEventListener('click', () => {
    if (!selectedGoal) {
        showNotification('Please select a career goal first!', 'warning');
        return;
    }
    
    if (currentSkills.length === 0) {
        showNotification('Please add at least one current skill!', 'warning');
        return;
    }

    analyzeSkillGap();
    addXP(50);
    showNotification('Skill gap analysis completed!', 'success');
});

function analyzeSkillGap() {
    const skillRequirements = {
        'full-stack': ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Database', 'Git', 'REST APIs'],
        'frontend': ['HTML', 'CSS', 'JavaScript', 'React/Vue', 'Responsive Design', 'Git', 'Webpack'],
        'backend': ['Python/Java', 'Database', 'REST APIs', 'Authentication', 'Docker', 'Git', 'Testing'],
        'data-scientist': ['Python', 'Statistics', 'Machine Learning', 'Pandas', 'NumPy', 'Visualization', 'SQL'],
        'mobile-dev': ['React Native/Flutter', 'Mobile UI/UX', 'State Management', 'API Integration', 'Testing'],
        'devops': ['Docker', 'Kubernetes', 'CI/CD', 'AWS/Azure', 'Linux', 'Monitoring', 'Infrastructure as Code']
    };

    const requiredSkills = skillRequirements[selectedGoal] || [];
    const missingSkills = requiredSkills.filter(skill => 
        !currentSkills.some(userSkill => 
            userSkill.toLowerCase().includes(skill.toLowerCase()) || 
            skill.toLowerCase().includes(userSkill.toLowerCase())
        )
    );

    displayRecommendations(missingSkills, requiredSkills);
    generateLearningPath(missingSkills);
}

function displayRecommendations(missingSkills, allSkills) {
    const recommendationsSection = document.getElementById('recommendationsSection');
    const recommendationText = document.getElementById('recommendationText');
    const skillsToLearn = document.getElementById('skillsToLearn');

    const completionPercentage = Math.round(
        ((allSkills.length - missingSkills.length) / allSkills.length) * 100
    );

    recommendationText.innerHTML = `
        You're ${completionPercentage}% ready for your ${selectedGoal.replace('-', ' ')} goal! 
        You have ${allSkills.length - missingSkills.length} out of ${allSkills.length} required skills.
        ${missingSkills.length > 0 ? `Focus on learning these ${missingSkills.length} key skills:` : 'Congratulations! You have all the required skills!'}
    `;

    skillsToLearn.innerHTML = missingSkills.map(skill => `
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
            <h4 class="font-semibold text-gray-800 dark:text-white">${skill}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                ${getSkillDescription(skill)}
            </p>
            <div class="mt-2">
                <span class="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                    ${getSkillDifficulty(skill)}
                </span>
            </div>
        </div>
    `).join('');

    recommendationsSection.classList.remove('hidden');
}

function getSkillDescription(skill) {
    const descriptions = {
        'HTML': 'Structure and markup language for web pages',
        'CSS': 'Styling and layout for web applications',
        'JavaScript': 'Programming language for web interactivity',
        'React': 'JavaScript library for building user interfaces',
        'Node.js': 'JavaScript runtime for server-side development',
        'Database': 'Data storage and management systems',
        'Git': 'Version control system for code management',
        'REST APIs': 'Web services for data communication',
        'Python': 'Versatile programming language',
        'Docker': 'Containerization platform',
        'Machine Learning': 'AI algorithms and data modeling'
    };
    return descriptions[skill] || 'Essential skill for your career path';
}

function getSkillDifficulty(skill) {
    const difficulties = {
        'HTML': 'Beginner',
        'CSS': 'Beginner',
        'JavaScript': 'Intermediate',
        'React': 'Intermediate',
        'Node.js': 'Intermediate',
        'Database': 'Intermediate',
        'Machine Learning': 'Advanced',
        'Docker': 'Advanced'
    };
    return difficulties[skill] || 'Intermediate';
}

function generateLearningPath(missingSkills) {
    const learningDurations = {
        'HTML': 7,
        'CSS': 14,
        'JavaScript': 21,
        'React': 14,
        'Node.js': 14,
        'Database': 10,
        'Git': 3,
        'Python': 21,
        'Docker': 7
    };

    learningPath = missingSkills.map((skill, index) => ({
        skill,
        duration: learningDurations[skill] || 7,
        order: index + 1,
        completed: false
    }));

    displayLearningPath();
}

function displayLearningPath() {
    const learningPathSection = document.getElementById('learningPathSection');
    const learningTimeline = document.getElementById('learningTimeline');

    let cumulativeDays = 0;
    learningTimeline.innerHTML = learningPath.map((item, index) => {
        const startDay = cumulativeDays + 1;
        cumulativeDays += item.duration;
        const endDay = cumulativeDays;

        return `
            <div class="learning-path-item flex items-start space-x-4">
                <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    ${index + 1}
                </div>
                <div class="flex-1 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 dark:text-white">${item.skill}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Days ${startDay}-${endDay} (${item.duration} days)
                    </p>
                    <div class="mt-2 flex items-center space-x-2">
                        <div class="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div class="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style="width: 0%"></div>
                        </div>
                        <span class="text-xs text-gray-500 dark:text-gray-400">0%</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    learningPathSection.classList.remove('hidden');
}

// Schedule creation
const createScheduleBtn = document.getElementById('createScheduleBtn');
createScheduleBtn.addEventListener('click', () => {
    const duration = parseInt(document.getElementById('learningDuration').value);
    createStudySchedule(duration);
    showNotification('Study schedule created!', 'success');
    addXP(30);
});

function createStudySchedule(totalDays) {
    const scheduleSection = document.getElementById('scheduleSection');
    const weeklySchedule = document.getElementById('weeklySchedule');
    const dailyTasks = document.getElementById('dailyTasks');

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const studyHours = ['9:00 AM - 11:00 AM', '2:00 PM - 4:00 PM', '7:00 PM - 9:00 PM'];

    weeklySchedule.innerHTML = daysOfWeek.map((day, index) => {
        const isWeekend = index >= 5;
        return `
            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="flex items-center space-x-3">
                    <i class="fas fa-calendar-day text-indigo-600"></i>
                    <span class="font-medium text-gray-800 dark:text-white">${day}</span>
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                    ${isWeekend ? 'Review & Practice' : studyHours[index % 3]}
                </div>
            </div>
        `;
    }).join('');

    const currentSkill = learningPath[0]?.skill || 'JavaScript';
    dailyTasks.innerHTML = `
        <div class="space-y-3">
            ${[
                'Read documentation and tutorials',
                'Complete hands-on exercises',
                'Build a small project',
                'Take practice quiz',
                'Review and take notes'
            ].map((task, index) => `
                <div class="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <input type="checkbox" class="w-4 h-4 text-indigo-600 rounded">
                    <span class="text-gray-800 dark:text-white">${task}</span>
                    <span class="ml-auto text-xs text-gray-500 dark:text-gray-400">
                        ${currentSkill}
                    </span>
                </div>
            `).join('')}
        </div>
    `;

    scheduleSection.classList.remove('hidden');
}

// Quiz functionality
const startQuizBtn = document.getElementById('startQuizBtn');
const quizContent = document.getElementById('quizContent');
const quizResults = document.getElementById('quizResults');

startQuizBtn.addEventListener('click', startQuiz);

function startQuiz() {
    generateQuizData();
    currentQuizIndex = 0;
    quizScore = 0;
    showQuizQuestion();
    quizContent.classList.remove('hidden');
    startQuizBtn.style.display = 'none';
}

function generateQuizData() {
    const questions = [
        {
            question: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyperlinking Text Marking Language"],
            correct: 0
        },
        {
            question: "Which of the following is NOT a JavaScript data type?",
            options: ["String", "Boolean", "Float", "Undefined"],
            correct: 2
        },
        {
            question: "What is the purpose of CSS?",
            options: ["To add interactivity", "To structure content", "To style web pages", "To manage databases"],
            correct: 2
        },
        {
            question: "Which HTTP method is used to retrieve data?",
            options: ["POST", "GET", "PUT", "DELETE"],
            correct: 1
        },
        {
            question: "What does API stand for?",
            options: ["Application Programming Interface", "Advanced Programming Interface", "Application Process Interface", "Automated Programming Interface"],
            correct: 0
        }
    ];

    quizData = questions.sort(() => Math.random() - 0.5).slice(0, 5);
}

function showQuizQuestion() {
    const question = quizData[currentQuizIndex];
    document.getElementById('questionCounter').textContent = `Question ${currentQuizIndex + 1} of ${quizData.length}`;
    document.getElementById('currentQuestion').textContent = question.question;
    
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = question.options.map((option, index) => `
        <button class="quiz-option w-full text-left p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gradient-to-r hover:text-white rounded-lg transition-all" 
                onclick="selectQuizOption(${index})">
            ${String.fromCharCode(65 + index)}. ${option}
        </button>
    `).join('');

    document.getElementById('prevQuestionBtn').disabled = currentQuizIndex === 0;
    document.getElementById('nextQuestionBtn').textContent = 
        currentQuizIndex === quizData.length - 1 ? 'Finish' : 'Next';
}

function selectQuizOption(selectedIndex) {
    const question = quizData[currentQuizIndex];
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach((option, index) => {
        option.classList.remove('bg-green-500', 'bg-red-500', 'text-white');
        if (index === question.correct) {
            option.classList.add('bg-green-500', 'text-white');
        } else if (index === selectedIndex && selectedIndex !== question.correct) {
            option.classList.add('bg-red-500', 'text-white');
        }
    });

    if (selectedIndex === question.correct) {
        quizScore++;
        document.getElementById('quizScore').textContent = quizScore;
    }

    question.selectedAnswer = selectedIndex;
    
    setTimeout(() => {
        if (currentQuizIndex < quizData.length - 1) {
            nextQuestion();
        } else {
            finishQuiz();
        }
    }, 1500);
}

function nextQuestion() {
    currentQuizIndex++;
    showQuizQuestion();
}

function finishQuiz() {
    quizContent.classList.add('hidden');
    document.getElementById('finalScore').textContent = `${quizScore}/${quizData.length}`;
    quizResults.classList.remove('hidden');
    
    // Add achievements and XP
    if (quizScore >= 3) {
        addXP(100);
        document.getElementById('quizAchievement').classList.remove('hidden');
        showNotification('Great job! Quiz completed with good score!', 'success');
    } else {
        addXP(50);
        showNotification('Quiz completed! Try again to improve your score.', 'info');
    }
}

document.getElementById('retakeQuizBtn').addEventListener('click', () => {
    quizResults.classList.add('hidden');
    startQuizBtn.style.display = 'inline-flex';
    document.getElementById('quizScore').textContent = '0';
});

// Progress tracking
function addXP(amount) {
    userStats.xp += amount;
    userStats.level = Math.floor(userStats.xp / 200) + 1;
    
    document.getElementById('userLevel').textContent = userStats.level;
    document.getElementById('totalXP').textContent = `${userStats.xp} XP`;
    
    updateProgressChart();
}

function updateProgressChart() {
    const ctx = document.getElementById('progressChart');
    if (!ctx) return;

    const skills = currentSkills.length > 0 ? currentSkills : ['HTML', 'CSS', 'JavaScript'];
    const progress = skills.map(() => Math.floor(Math.random() * 100));

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: skills,
            datasets: [{
                data: progress,
                backgroundColor: [
                    '#8B5CF6',
                    '#3B82F6',
                    '#10B981',
                    '#F59E0B',
                    '#EF4444'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    
    const colors = {
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        error: 'bg-red-500',
        info: 'bg-blue-500'
    };
    
    const icons = {
        success: 'fa-check-circle',
        warning: 'fa-exclamation-triangle',
        error: 'fa-times-circle',
        info: 'fa-info-circle'
    };

    notification.className = `notification ${colors[type]} text-white p-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-sm`;
    notification.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="ml-auto">
            <i class="fas fa-times"></i>
        </button>
    `;

    container.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Reminder system
document.getElementById('addReminderBtn').addEventListener('click', () => {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                showNotification('Reminder system activated!', 'success');
                // Set sample reminder
                setTimeout(() => {
                    new Notification('SkillBridge AI Reminder', {
                        body: 'Time for your daily learning session!',
                        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🤖</text></svg>'
                    });
                }, 5000);
            }
        });
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    updateProgressChart();
    
    // Sample skills for demo
    setTimeout(() => {
        if (currentSkills.length === 0) {
            currentSkills = ['HTML', 'CSS'];
            updateSkillsDisplay();
        }
    }, 1000);
});