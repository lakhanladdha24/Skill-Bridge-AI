document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatBox = document.getElementById('chat-box');
    const typingIndicator = document.getElementById('typing-indicator');
    const clearChatBtn = document.getElementById('clear-chat');

    let chatHistory = [];

    // Enable/disable send button based on input
    userInput.addEventListener('input', () => {
        sendBtn.disabled = userInput.value.trim() === '';
    });

    // Handle form submission
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        if (!message) return;

        // Add user message to UI
        addMessage(message, 'user');

        // Disable input while processing
        userInput.value = '';
        sendBtn.disabled = true;
        userInput.disabled = true;

        // Show typing indicator
        showTypingIndicator();

        try {
            // Send to backend
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    history: chatHistory
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get response');
            }

            // Update local history
            chatHistory.push({ role: 'user', content: message });
            chatHistory.push({ role: 'model', content: data.reply });

            // Hide typing and add bot message
            hideTypingIndicator();
            addMessage(data.reply, 'bot');

        } catch (error) {
            hideTypingIndicator();
            addMessage('Sorry, I am facing an issue at the moment. Please try again later.', 'bot', true);
            console.error('Chat Error:', error);
        } finally {
            // Re-enable input
            userInput.disabled = false;
            userInput.focus();
        }
    });

    // Clear chat handler
    clearChatBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear the chat history?')) {
            chatHistory = [];
            chatBox.innerHTML = `
                <div class="message bot-message">
                    <div class="message-content">
                        Hello! I'm SkillBridgeAI, your personal career mentor. How can I help you today with your career, resume, or interview preparation?
                    </div>
                </div>
            `;
        }
    });

    // Helper functions
    function addMessage(text, sender, isError = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message ${isError ? 'error-message' : ''}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        // Use marked.js for bot responses to parse markdown
        if (sender === 'bot' && !isError) {
            contentDiv.innerHTML = marked.parse(text);
        } else {
            contentDiv.textContent = text;
        }

        messageDiv.appendChild(contentDiv);
        chatBox.appendChild(messageDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        typingIndicator.classList.remove('hidden');
        scrollToBottom();
    }

    function hideTypingIndicator() {
        typingIndicator.classList.add('hidden');
    }

    function scrollToBottom() {
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
