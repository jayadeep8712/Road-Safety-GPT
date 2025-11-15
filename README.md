# 🚦 Road-Safety-Intervention-GPT

An AI-powered expert system designed to identify and recommend precise road safety interventions based on natural language descriptions of hazardous conditions. This project was developed for the **National Road Safety Hackathon 2025**.

## 🚀 Live Demo

**[Insert Your Deployed Vercel/Netlify URL Here]**

> **Note:** The backend may take a few seconds to "wake up" on the first request due to the cold start nature of serverless functions.

## 📝 Problem Statement

As per the hackathon brief, selecting appropriate road safety interventions is critical for effective mitigation. This project provides a tool that queries a curated database of best practices and guidelines to provide the most suitable intervention for a given road safety issue.

## ✨ Key Features

- **Sophisticated AI Core (RAG Engine):**
  
  Uses a Retrieval-Augmented Generation pipeline that retrieves the most relevant technical data from the CSV knowledge base, then generates precise, context-aware recommendations.

- **Advanced Prompt Engineering:**
  
  Powered by a master prompt with strict guardrails and an expert persona, the AI always responds in a clean, structured JSON format.

- **Modern Full-Stack Architecture:**
  
  Built with a decoupled **React frontend** and **Node.js/Express backend** for clean separation, scalability, and maintainability.

- **QR Code & Report Sharing System:**
  
  Users can instantly share analysis results through a unique URL and dynamic QR code.

- **Polished & Responsive UI/UX:**
  
  Designed with Tailwind CSS for a modern experience with loading skeletons, intuitive feedback, and full responsiveness.

## 🏗️ Architecture Diagram

This project follows a decoupled, full-stack architecture.

```mermaid
graph TD
    A[User] --> B{React Frontend <br>on Port 5173}
    B -->|1. POST Request with User Input| C{Node.js/Express Backend <br>on Port 3001}
    C -->|2. Retrieve Relevant Docs <br>RAG| D[CSV Database]
    D -->|3. Augment Prompt| C
    C -->|4. Query with Context| E[Google Gemini AI]
    E -->|5. Structured JSON Response| C
    C -->|6. Send Formatted Report| B
    B -->|7. Display ReportCard| A
```

## 🛠️ Tech Stack

| Area | Technology |
|------|------------|
| Frontend | React, Vite, Tailwind CSS, React Router |
| Backend | Node.js, Express.js, dotenv |
| AI | Google Gemini API |
| Database | CSV file parsed with csv-parse |

## 🚀 Getting Started (Local Setup)

Follow these instructions to run the full-stack application locally.

### Prerequisites

- Node.js (v18.x or higher)
- Git
- Google Gemini API Key

### 1. Clone the Repository

```bash
git clone https://github.com/jayadeep8712/Road-Safety-GPT.git
cd road-safety-expert-system
```

### 2. Set Up the Backend

#### Navigate to the backend directory:

```bash
cd backend
```

#### Install dependencies:

```bash
npm install
```

#### Create a `.env` file in the backend directory

#### Add your Gemini API key:

```env
GEMINI_API_KEY="your-secret-api-key-here"
```

### 3. Set Up the Frontend

#### Navigate to the frontend directory:

```bash
cd frontend
```

#### Install dependencies:

```bash
npm install
```

### 4. Run the Application

Open two terminals:

#### Terminal 1 - Start the Backend

```bash
cd backend
node server.js
```

You should see: `🚀 Backend server is running on http://localhost:3001`

#### Terminal 2 - Start the Frontend

```bash
cd frontend
npm run dev
```

Open the provided URL, typically `http://localhost:5173`.

## 🔮 Future Improvements

- **Image Upload:** Analyze road safety issues via multimodal AI
- **Geolocation:** Tag reports with GPS coordinates
- **Advanced RAG:** Use vector embeddings for semantic search
- **User Authentication & History:** Allow login and report history

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

**Developed by Team The Safe-T-Bytes**

---

**National Road Safety Hackathon 2025**