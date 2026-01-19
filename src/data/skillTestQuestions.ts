export interface Question {
    id: number;
    skill: string;
    question: string;
    options: string[];
    correctAnswer: string;
}

export const skillTestQuestions: Question[] = [
    // AI Questions
    {
        id: 1,
        skill: "AI",
        question: "Which of the following is a supervised learning algorithm?",
        options: ["K-Means Clustering", "Linear Regression", "Apriori", "PCA"],
        correctAnswer: "Linear Regression"
    },
    {
        id: 2,
        skill: "AI",
        question: "What does NLP stand for in Artificial Intelligence?",
        options: ["Neural Language Processing", "Natural Language Processing", "New Learning Protocol", "Network Language Programming"],
        correctAnswer: "Natural Language Processing"
    },
    {
        id: 3,
        skill: "AI",
        question: "Which activation function is commonly used in hidden layers of a neural network?",
        options: ["Sigmoid", "ReLU", "Softmax", "Step Function"],
        correctAnswer: "ReLU"
    },
    {
        id: 4,
        skill: "AI",
        question: "Which term describes the process of training a model on a subset of data and testing it on another?",
        options: ["Overfitting", "Cross-Validation", "Regularization", "Backpropagation"],
        correctAnswer: "Cross-Validation"
    },
    {
        id: 5,
        skill: "AI",
        question: "What is the purpose of a Loss Function?",
        options: ["To increase accuracy", "To measure the error between predicted and actual values", "To speed up training", "To visualize data"],
        correctAnswer: "To measure the error between predicted and actual values"
    },

    // Web Dev Questions
    {
        id: 6,
        skill: "Web Dev",
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
        correctAnswer: "Cascading Style Sheets"
    },
    {
        id: 7,
        skill: "Web Dev",
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<script>", "<style>", "<css>", "<link>"],
        correctAnswer: "<style>"
    },
    {
        id: 8,
        skill: "Web Dev",
        question: "What is the correct syntax for referring to an external script called 'app.js'?",
        options: ["<script href='app.js'>", "<script name='app.js'>", "<script src='app.js'>", "<script file='app.js'>"],
        correctAnswer: "<script src='app.js'>"
    },
    {
        id: 9,
        skill: "Web Dev",
        question: "Which property is used to change the background color?",
        options: ["color", "bgcolor", "background-color", "background-image"],
        correctAnswer: "background-color"
    },
    {
        id: 10,
        skill: "Web Dev",
        question: "How do you select an element with id 'demo'?",
        options: ["#demo", ".demo", "demo", "*demo"],
        correctAnswer: "#demo"
    },

    // DSA Questions
    {
        id: 11,
        skill: "DSA",
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
        correctAnswer: "O(log n)"
    },
    {
        id: 12,
        skill: "DSA",
        question: "Which data structure follows LIFO (Last In First Out)?",
        options: ["Queue", "Stack", "Linked List", "Tree"],
        correctAnswer: "Stack"
    },
    {
        id: 13,
        skill: "DSA",
        question: "What is the worst case time complexity of Quick Sort?",
        options: ["O(n log n)", "O(n)", "O(n^2)", "O(log n)"],
        correctAnswer: "O(n^2)"
    },
    {
        id: 14,
        skill: "DSA",
        question: "Which data structure is used for Breadth First Search (BFS)?",
        options: ["Stack", "Queue", "Priority Queue", "Heap"],
        correctAnswer: "Queue"
    },
    {
        id: 15,
        skill: "DSA",
        question: "What is a Hash Table used for?",
        options: ["Sorting data", "Storing key-value pairs", "Finding shortest path", "Hierarchical data storage"],
        correctAnswer: "Storing key-value pairs"
    },

    // Python Questions
    {
        id: 16,
        skill: "Python",
        question: "How do you create a function in Python?",
        options: ["function myFunc():", "create myFunc():", "def myFunc():", "func myFunc():"],
        correctAnswer: "def myFunc():"
    },
    {
        id: 17,
        skill: "Python",
        question: "Which of the following is a mutable data type in Python?",
        options: ["Tuple", "String", "List", "Integer"],
        correctAnswer: "List"
    },
    {
        id: 18,
        skill: "Python",
        question: "What is the output of print(2 ** 3)?",
        options: ["6", "8", "9", "5"],
        correctAnswer: "8"
    },
    {
        id: 19,
        skill: "Python",
        question: "How do you insert comments in Python code?",
        options: ["// This is a comment", "# This is a comment", "/* This is a comment */", "<!-- This is a comment -->"],
        correctAnswer: "# This is a comment"
    },
    {
        id: 20,
        skill: "Python",
        question: "Which keyword is used to import a module?",
        options: ["include", "import", "using", "require"],
        correctAnswer: "import"
    }
];
