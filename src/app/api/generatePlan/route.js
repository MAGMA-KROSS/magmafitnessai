import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const userInput = await req.json();

    const systemInstruction = `
    You are a professional fitness and nutrition coach AI.
    Your task is to create a complete personalized fitness and diet plan based on the given input JSON.
    Format the output in Markdown.
    Include the following sections clearly:
    1. Body Stats (Estimated Body Fat %, BMI, BMR, TDEE)
    2. Daily Nutrition Goals (Calories, Protein, Carbs, Fats)
    3. Weekly Workout Plan (7-day schedule with exercises, sets, reps, rest)
    4. Diet Plan (3 Main Meals + 2 Snacks with food items and macros)
    5. Pro Tips (Lifestyle, recovery, hydration, sleep advice)

    Use the INPUT JSON as dynamic values and generate plans accordingly. Do not use repeating day names like "Thursday: Repeat Day 1". Write out the full plan for each day.
    
    INPUT JSON:
    ${JSON.stringify(userInput, null, 2)}
  `;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction,
    });

    const prompt = `
      Generate a fitness and diet plan for the following user:
      ${JSON.stringify(userInput, null, 2)}
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;

    return new Response(response.text(), {
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}