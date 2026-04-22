import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getQuizFeedback(mistakes: any[]) {
  if (mistakes.length === 0) return "Perfect score! You have a solid grasp of these concepts. Keep practicing to maintain your speed.";
  
  const prompt = `You are a professional TOEIC tutor. Analyze the following student mistakes and provide concise, actionable feedback. 
  
  Mistakes:
  ${mistakes.map(m => `- Question: ${m.text}\n  Student Answer: ${m.studentAnswer}\n  Correct Answer: ${m.correctAnswer}`).join('\n')}
  
  Provide a summary of the underlying grammar or vocabulary patterns they are missing and suggest one specific drill. Limit to 3 sentences.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Great effort! Focus on reviewing the areas where you missed points to improve for next time.";
  }
}
