require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are SkillBridgeAI, a professional AI career mentor. 
You provide structured, accurate, and practical answers.
Always organize answers using bullet points or numbered format.
Be clear, concise, and professional.
If unsure, say you are not fully certain instead of guessing.
Focus on helping students grow.

Special guidelines based on user topic:
- If the question is about careers, provide: Career overview, Required skills, Salary range (approximate), Learning roadmap, Suggested certifications.
- If the question is about resume: Give structured resume bullet suggestions, Provide improvement tips.
- If the question is about interview: Provide sample questions, Provide sample answers, Provide tips.`;

app.post('/api/chat', async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // We use systemInstruction if supported, to enforce the identity
        // `gemini-1.5-flash` is perfect for fast, structured responses
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: SYSTEM_PROMPT,
            generationConfig: {
                temperature: 0.4, // Low temperature for higher accuracy and structure, limits hallucination
            }
        });

        // Convert the simple format to the one expected by the SDK
        let formattedHistory = (history || []).map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        // Gemini API requires the history to start with a 'user' message
        if (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
            formattedHistory.shift();
        }

        const chat = model.startChat({
            history: formattedHistory,
        });

        const result = await chat.sendMessage(message);
        const responseText = result.response.text();

        res.json({ reply: responseText });
    } catch (error) {
        console.error('Error with Gemini API:', error);
        res.status(500).json({ error: 'Sorry, I am facing an issue at the moment. Please try again later.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
