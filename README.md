\#🚦 Road-Safety-Intervention-GPT





An AI-powered expert system designed to identify and recommend precise road safety interventions based on natural language descriptions of hazardous conditions. This project was developed for the \*\*National Road Safety Hackathon 2025\*\*.





\## 🚀 Live Demo



\*\*\[Insert Your Deployed Vercel/Netlify URL Here]\*\*



> \*\*Note:\*\* The backend may take a few seconds to "wake up" on the first request due to the cold start nature of serverless functions (if you choose to deploy it that way later).

<br>



\## 📝 Problem Statement



As per the hackathon brief, the selection of appropriate road safety interventions is critical for effective mitigation. This project addresses the need for a tool that can query a curated database of best practices and guidelines to provide the most suitable intervention for a given road safety issue, taking into account the problem description and context.

<br>



\## ✨ Key Features



\- \*\*Sophisticated AI Core (RAG Engine):\*\*  

&nbsp; Uses a Retrieval-Augmented Generation pipeline that first retrieves the most relevant technical data from the CSV knowledge base, then generates precise, context-aware recommendations. This ensures high accuracy with zero hallucinations.



\- \*\*Advanced Prompt Engineering:\*\*  

&nbsp; Powered by a master prompt with strict guardrails and an expert persona. The AI gracefully handles off-topic and out-of-scope queries while always responding in a clean, structured JSON format.



\- \*\*Modern Full-Stack Architecture:\*\*  

&nbsp; Built with a decoupled \*\*React frontend\*\* and \*\*Node.js/Express backend\*\*, ensuring clean separation of concerns, scalability, and smooth maintainability.



\- \*\*QR Code \& Report Sharing System:\*\*  

&nbsp; Users can instantly share analysis results through a unique URL and dynamic QR code, enabling on-ground accessibility and streamlined reporting.



\- \*\*Polished \& Responsive UI/UX:\*\*  

&nbsp; Designed with Tailwind CSS to provide a seamless, modern experience with loading skeletons, intuitive feedback, and full responsiveness across devices.

<br>



\## 🏗️ Architecture Diagram



This project follows a decoupled, full-stack architecture.



```mermaid

graph TD

&nbsp;   A\[User] --> B{React Frontend (on Port 5173)};

&nbsp;   B -->|1. POST Request with User Input| C{Node.js/Express Backend (on Port 3001)};

&nbsp;   C -->|2. Retrieve Relevant Docs (RAG)| D\[CSV Database];

&nbsp;   D -->|3. Augment Prompt| C;

&nbsp;   C -->|4. Query with Context| E\[Google Gemini AI];

&nbsp;   E -->|5. Structured JSON Response| C;

&nbsp;   C -->|6. Send Formatted Report| B;

&nbsp;   B -->|7. Display ReportCard| A;

```

<br>



\## 🛠️ Tech Stack

Area	Technology

Frontend	React, Vite, Tailwind CSS, React Router

Backend	Node.js, Express.js, dotenv

AI	Google Gemini API

Database	CSV file parsed with csv-parse

<br>



\##🚀 Getting Started (Local Setup)



Follow these instructions to get the entire full-stack application running on your local machine.

Prerequisites

Node.js (v18.x or higher)

Git

A Google Gemini API Key (obtainable from Google AI Studio)



\## \*\*1. Clone the Repository\*\*



```
git clone https://github.com/jayadeep8712/Road-Safety-GPT.git



cd road-safety-expert-system

```

\## \*\*2. Set Up the Backend\*\*



The backend server must be running for the frontend to work.



1.Navigate to the backend directory:



```
cd backend

```



2.Install dependencies:



```

npm install

```



3.Create the environment file:

Create a new file named '.env' in the 'backend' directory.



4.Add your API Key:

Add your Google Gemini API key to the '.env' file.



```

GEMINI\_API\_KEY="your-secret-api-key-here"

```

\## \*\*3.Set Up the Frontend\*\*



1.Navigate to the frontend directory:

(From the root directory)



```

cd frontend

```



2.Install dependencies:



```

npm install

```



\## \*\*4. Run the Application\*\*



You need to have \*\*two separate terminals\*\* open and running simultaneously.



1.Start the Backend Server:

In your first terminal (in the 'backend' directory):



```

node server.js

```

You should see a message: '🚀 Backend server is running on http://localhost:3001'



2.Start the Frontend Server:

In your second terminal (in the 'frontend' directory):



```

npm run dev

```



You will get a URL, typically 'http://localhost:5173'.



Open the App:

Open 'http://localhost:5173' in your web browser to use the application.

<br>



\## \*\*🔮 Future Improvements\*\*



Image Upload: Allow users to upload a photo of the road safety issue, which could be analyzed by a multimodal AI model.



Geolocation: Tag reports with GPS coordinates for precise location mapping.



Advanced RAG: Implement vector embeddings for the database to enable more nuanced semantic search instead of keyword matching.



User Authentication \& History: Allow users to log in and view a history of their submitted reports.



Developed by Team The Safe-T-Bytes







