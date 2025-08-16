import { GoogleGenAI, Type } from "@google/genai";
import type { StudyPlan } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const studyPlanSchema = {
  type: Type.OBJECT,
  properties: {
    planTitle: {
      type: Type.STRING,
      description: "A creative and encouraging title for the study plan, in the requested language."
    },
    monthlyBreakdown: {
      type: Type.ARRAY,
      description: "An array of monthly plans.",
      items: {
        type: Type.OBJECT,
        properties: {
          month: {
            type: Type.INTEGER,
            description: "The month number (e.g., 1, 2, 3)."
          },
          focus: {
            type: Type.STRING,
            description: "The primary focus for this month, in the requested language."
          },
          weeklyGoals: {
            type: Type.ARRAY,
            description: "An array of weekly goals for the month.",
            items: {
              type: Type.OBJECT,
              properties: {
                week: {
                  type: Type.INTEGER,
                  description: "The week number within the month (e.g., 1, 2, 3, 4)."
                },
                topic: {
                  type: Type.STRING,
                  description: "The specific topic or subjects to cover this week, in the requested language."
                },
                resources: {
                  type: Type.ARRAY,
                  description: "A list of suggested resource types, (e.g., 'Video lectures', 'PDF notes', 'Practice test'), in the requested language.",
                  items: { type: Type.STRING }
                },
                goal: {
                  type: Type.STRING,
                  description: "A clear, measurable goal for the week, in the requested language."
                }
              },
              required: ["week", "topic", "resources", "goal"]
            }
          }
        },
        required: ["month", "focus", "weeklyGoals"]
      }
    }
  },
  required: ["planTitle", "monthlyBreakdown"]
};


export const generateStudyPlan = async (examName: string, weakSubjects: string, strongSubjects: string, durationInMonths: number, language: 'en' | 'hi'): Promise<StudyPlan> => {
  const langInstruction = language === 'hi'
    ? "IMPORTANT: Your entire response, including all fields in the JSON object, must be in Hindi (using Devanagari script). Ensure the village name is spelled 'सहूर'."
    : "IMPORTANT: Your entire response, including all fields in the JSON object, must be in English.";

  const prompt = `
    You are 'Karya Dost', an expert AI academic and skills coach. Your audience is students (age 12+) in Sahoor village, Lakhisarai, Bihar.
    Your tone must be structured, clear, and motivational, like a professional teacher. While being encouraging, maintain objectivity and focus on providing actionable, clear guidance. Avoid overly casual or conversational language.
    
    ${langInstruction}

    Create a detailed, realistic, and encouraging ${durationInMonths}-month study plan for the following topic: "${examName}".
    The user's weak areas are: ${weakSubjects}.
    The user's strong areas are: ${strongSubjects}.

    Your plan should:
    1. Focus on building a strong foundation in the weak areas first.
    2. Include revision of strong areas.
    3. Suggest practical, objective, and measurable goals. For skills, suggest small projects (e.g., 'design a one-page poster on Canva', 'write a 150-word formal paragraph in English'). For academics, suggest chapter-wise goals with clear outcomes (e.g., 'solve 20 problems from chapter 5').
    4. The resource suggestions should be practical for a village student, like 'free YouTube tutorials', 'government educational portals like DIKSHA', 'NCERT textbooks', 'peer study groups'.

    The output must be a clean JSON object that adheres to the provided schema. Do not add any extra text or markdown formatting around the JSON object.
    `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: studyPlanSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const plan = JSON.parse(jsonText) as StudyPlan;
    
    if (!plan.planTitle || !plan.monthlyBreakdown) {
        throw new Error("AI returned an invalid plan structure. Please try again.");
    }
    
    return plan;
  } catch (error) {
    console.error("Error generating study plan:", error);
    throw new Error("Failed to generate study plan from AI. Please check your inputs and try again.");
  }
};

export const explainTopic = async (topic: string, language: 'en' | 'hi'): Promise<string> => {
    const langInstruction = language === 'hi'
    ? "IMPORTANT: Your entire response must be in clear, objective Hindi (using Devanagari script). Ensure the village name is spelled 'सहूर'."
    : "IMPORTANT: Your entire response must be in clear, objective English.";

  const prompt = `
    You are 'Karya Dost', an expert AI tutor. Your student is from Sahoor village in Bihar.
    Your task is to explain the topic clearly and objectively. Use simple language and relatable, practical examples relevant to a village student's life.
    
    ${langInstruction}

    Structure your explanation logically with bullet points or short, focused paragraphs for easy understanding. Maintain an encouraging but authoritative tone. Avoid overly casual chat.
    
    Topic: "${topic}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.5,
      },
    });
    
    return response.text;
  } catch (error) {
    console.error("Error explaining topic:", error);
    throw new Error(`Failed to get an explanation for "${topic}". The AI model might be busy.`);
  }
};