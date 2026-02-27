const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent("Hello?");
        console.log(result.response.text());
    } catch (e) {
        console.error("1.5-flash failed:", e.message);
        try {
            const model2 = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
            const result2 = await model2.generateContent("Hello?");
            console.log("latest worked!");
        } catch (e2) {
            console.error("latest failed:", e2.message);
            try {
                const model3 = genAI.getGenerativeModel({ model: 'gemini-pro' });
                const result3 = await model3.generateContent("Hello?");
                console.log("gemini-pro worked!");
            } catch (e3) {
                console.error("gemini-pro failed:", e3.message);
            }
        }
    }
}
run();
