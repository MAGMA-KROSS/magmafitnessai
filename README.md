# 🔥 MagmaFitnessAI - Your Personal AI Fitness Coach

**MagmaFitnessAI** is a modern, AI-powered web application designed to be your all-in-one fitness companion. It leverages the power of Google's Gemini AI to generate fully personalized workout and diet plans, alongside a suite of powerful calculators to track and estimate your fitness metrics.

## ✨ Features

- **🤖 AI-Powered Personalized Plans**: Get a complete, tailored fitness and diet plan based on your unique profile, goals, and preferences.
- **🏋️‍♂️ Strength Standards Calculators**: Estimate your one-rep max for major lifts (Bench Press, Squat, Deadlift) based on your body weight and gender, with standards for beginner, intermediate, and advanced levels.
- **📊 Health & Body Metrics**: A suite of calculators including:
  - **BMI Calculator**: Quickly determine your Body Mass Index.
  - **Body Fat Calculator**: Estimate your body fat percentage using the U.S. Navy method.
- **🔐 User Authentication**: Secure sign-up and sign-in functionality powered by Clerk to manage user profiles and data.
- **📝 Onboarding Flow**: A smooth, multi-step process to gather all the necessary information to create your personalized plans.
- **sleek, Dark-Themed UI**: A modern and responsive user interface built with Tailwind CSS, designed for a great user experience on any device.

## 🛠️ Tech Stack

This project is built with a modern, robust, and scalable technology stack:

- **Frontend**: [Next.js](https://nextjs.org/) & [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI**: [Google Gemini AI](https://ai.google.dev/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [MongoDB](https://www.mongodb.com/cloud/atlas/register) database URI
- API keys for [Clerk](https://clerk.com/) and [Google Gemini AI](https://ai.google.dev/)

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/MAGMA-KROSS/magmafitnessai.git
    cd magmafitnessai
    ```

2. **Install NPM packages:**

    ```sh
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add the following variables:

    ```env
    # MongoDB
    MONGODB_URI=your_mongodb_connection_string

    # Clerk Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

    # Google Gemini AI
    GEMINI_API_KEY=your_google_gemini_api_key
    ```

4. **Run the development server:**

    ```sh
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📬 Contact

Your Name - [@abi](https://www.linkedin.com/in/abiikx) - <abik4001@gmail.com>

Project Link: [https://github.com/MAGMA-KROSS/magmafitnessai.git](https://github.com/MAGMA-KROSS/magmafitnessai.git)
