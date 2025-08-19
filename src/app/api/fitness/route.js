import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define the core instructions for the AI model separately.
// This acts as the system prompt.
const systemInstruction = `
You are a professional fitness and nutrition coach AI.
Your task is to create a **complete personalized fitness and diet plan** based on the given input JSON.

INPUT (JSON):
{
    name: "Abi",
    age: 19,
    gender: "male",
    height_cm: 170,
    weight_kg: 49,
    activity_level: "moderate",
    fitness_goal: "bulk",
    workout_preference: "gym",
    diet_preference: "non-veg",
    equipment_available: "none",
    injuries: "none"
}

---

### OUTPUT REQUIREMENTS:
Format the output in **Markdown**.
Include the following sections clearly:

1.  **Body Stats**
    - Estimated Body Fat %
    - BMI
    - BMR (Basal Metabolic Rate)
    - TDEE (Total Daily Energy Expenditure)

2.  **Daily Nutrition Goals**
    - Calories needed (based on fitness goal)
    - Protein (g)
    - Carbohydrates (g)
    - Fats (g)

3.  **Weekly Workout Plan**
    - 7-day schedule (Day 1 → Day 7)
    - For each day: exercise name, sets, reps, rest time
    - Tailored to given workout preference & equipment availability

4.  **Diet Plan (Non-Veg in this case)**
    - 3 Main Meals + 2 Snacks (Breakfast, Lunch, Dinner, Snack 1, Snack 2)
    - Include food items with approximate macros (protein, carbs, fats)

5.  **Pro Tips**
    - Lifestyle recommendations
    - Recovery suggestions
    - Hydration and sleep advice

---

### EXAMPLE OUTPUT (Markdown):

# 🏋️ Personalized Fitness Plan for Abi
## 📊 Body Stats
- Body Fat %: ~12–14%
- BMI: 16.9 (Underweight)
- BMR: 1500 kcal/day
- TDEE: 2100 kcal/day

## 🍽️ Daily Nutrition Goals
- Calories: **2500 kcal/day**
- Protein: **120 g**
- Carbs: **330 g**
- Fats: **70 g**

## 🗓️ Weekly Workout Plan
**Day 1: Chest & Triceps**
- Push-ups: 4x12, Rest 60s
- Bench Press (if available): 4x10
- Tricep Dips (chair): 3x12

**Day 2: Back & Biceps**
- Pull-ups (if bar available): 4x8
- Dumbbell Rows (or water bottles): 4x10
- Bicep Curls: 3x12

... (continue for 7 days)

## 🥗 Sample Diet Plan (Non-Veg)
**Breakfast:** 4 boiled eggs + 2 parathas + 1 glass milk
**Snack 1:** Peanut butter sandwich + banana
**Lunch:** Chicken breast (150g) + rice + vegetables
**Snack 2:** Protein shake + nuts
**Dinner:** Fish curry + chapati + salad

## 💡 Pro Tips
- Sleep: 7–8 hrs daily
- Hydration: 3–4L water/day
- Progressive overload for muscle gain
- Track progress weekly

---

⚡ Use the **INPUT JSON** as dynamic values and generate plans accordingly and don't use words like thusday:repeat.

`;


export async function POST(req) {
  try {
    const userInput = await req.json();

    // Select a model. gemini-1.5-flash is a fast and capable model.
    // Configure the model with the system instructions.
    // REMOVED the generationConfig to allow for Markdown output.
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction,
    });

    // The user prompt now only needs to contain the variable user data.
    const prompt = `
      Generate a fitness and diet plan for the following user:
      ${JSON.stringify(userInput, null, 2)}
    `;

    // Call the Gemini API
    const result = await model.generateContent(prompt);
    const response = result.response;
    
    // Return the raw Markdown text from the model
    return new Response(response.text(), {
      // Updated header to correctly represent Markdown content
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