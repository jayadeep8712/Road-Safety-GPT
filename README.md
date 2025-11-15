Of course. You've provided an excellent, well-structured README. I've taken it and applied a final layer of professional polish to make it even more scannable, impactful, and clear for the hackathon judges.



The key changes are:



Improved Formatting: Replaced all <br> tags with standard markdown for better readability.



Punchier Language: Slightly rephrased the Key Features to better highlight their technical significance.



Screenshot Section: Added a dedicated place for a screenshot or GIF, which is one of the most effective ways to impress judges.



Cleaner Instructions: Standardized the headings and clarified the setup steps to be foolproof.



This version is designed to be a "one-click" copy and paste.



Action: Copy This Entire Block into Your Root README.md

code

Markdown

download

content\_copy

expand\_less

\# 🚦 Road-Safety-Intervention-GPT



An AI-powered expert system designed to identify and recommend precise road safety interventions based on natural language descriptions of hazardous conditions. This project was developed for the \*\*National Road Safety Hackathon 2025\*\*.



---



\## 🚀 Live Demo



\*\*\[Insert Your Deployed Vercel/Netlify URL Here]\*\*



> \*\*Note:\*\* The backend may take a few seconds to "wake up" on the first request due to the cold start nature of serverless functions.



\## 📝 Problem Statement



As per the hackathon brief, selecting appropriate road safety interventions is critical for effective mitigation. This project provides a tool that queries a curated database of best practices and guidelines to provide the most suitable intervention for a given road safety issue.



\## ✨ Key Features \& Technical Highlights



\-   \*\*Sophisticated AI Core (RAG):\*\* Employs a Retrieval-Augmented Generation pipeline for high-accuracy, hallucination-free responses. The system first retrieves the most relevant technical data from the CSV knowledge base, then uses the AI to generate a precise, context-aware recommendation.



\-   \*\*Advanced Prompt Engineering:\*\* Powered by a master prompt with strict guardrails and an expert persona. The AI intelligently handles out-of-scope and off-topic questions and is commanded to always respond in a clean, structured JSON format for reliable API communication.



\-   \*\*Modern Full-Stack Architecture:\*\* Built with a decoupled \*\*React frontend\*\* and a \*\*Node.js/Express backend\*\*. This standard architecture ensures a clean separation of concerns, scalability, and maintainability.



\-   \*\*QR Code \& Report Sharing System:\*\* Fulfills the "Scan QR for Report" requirement with a fully functional report sharing system. Users can instantly share analysis results through a unique URL and a dynamically generated QR code, powered by React Router for clean client-side routing.



\-   \*\*Polished \& Responsive UI/UX:\*\* Designed with Tailwind CSS for a modern, professional experience. The interface features informative loading skeletons, intuitive feedback, and is fully responsive for all devices.



\## 📸 Screenshot



\*Replace with a URL to your own screenshot or GIF!\*





\## 🏗️ Architecture Diagram



This project follows a decoupled, full-stack architecture.



```mermaid

graph TD

&nbsp;   A\[User] --> B{React Frontend <br>on Port 5173};

&nbsp;   B -->|1. POST Request with User Input| C{Node.js/Express Backend <br>on Port 3001};

&nbsp;   C -->|2. Retrieve Relevant Docs <br>(RAG)| D\[CSV Database];

&nbsp;   D -->|3. Augment Prompt| C;

&nbsp;   C -->|4. Query with Context| E\[Google Gemini AI];

&nbsp;   E -->|5. Structured JSON Response| C;

&nbsp;   C -->|6. Send Formatted Report| B;

&nbsp;   B -->|7. Display ReportCard| A;

```



\## 🛠️ Tech Stack



| Area      | Technology                                                                                                   |

| --------- | ------------------------------------------------------------------------------------------------------------ |

| \*\*Frontend\*\*  | React, Vite, Tailwind CSS, React Router                                                                      |

| \*\*Backend\*\*   | Node.js, Express.js, dotenv                                                                                  |

| \*\*AI\*\*        | Google Gemini API                                                                                            |

| \*\*Database\*\*  | CSV file parsed with `csv-parse`                                                                             |



\## 🚀 Getting Started (Local Setup)



Follow these instructions to run the full-stack application on your local machine.



\### Prerequisites

\-   Node.js (v18.x or higher)

\-   Git

\-   A Google Gemini API Key (from \[Google AI Studio](https://aistudio.google.com/app/apikey))



\### 1. Clone the Repository

```bash

git clone https://github.com/jayadeep8712/Road-Safety-GPT.git

cd Road-Safety-GPT

```



\### 2. Set Up the Backend

1\.  \*\*Navigate to the backend directory:\*\*

&nbsp;   ```bash

&nbsp;   cd backend

&nbsp;   ```

2\.  \*\*Install dependencies:\*\*

&nbsp;   ```bash

&nbsp;   npm install

&nbsp;   ```

3\.  \*\*Create an environment file:\*\*

&nbsp;   Create a new file named `.env` in the `backend` directory.

4\.  \*\*Add your Gemini API key to the `.env` file:\*\*

&nbsp;   ```

&nbsp;   GEMINI\_API\_KEY="your-secret-api-key-here"

&nbsp;   ```



\### 3. Set Up the Frontend

1\.  \*\*Navigate to the frontend directory\*\* (from the root folder):

&nbsp;   ```bash

&nbsp;   cd frontend

&nbsp;   ```

2\.  \*\*Install dependencies:\*\*

&nbsp;   ```bash

&nbsp;   npm install

&nbsp;   ```



\### 4. Run the Application

You will need to have \*\*two separate terminals\*\* open to run the application.



\-   \*\*Terminal 1: Start the Backend\*\*

&nbsp;   (Navigate to the `backend` directory)

&nbsp;   ```bash

&nbsp;   node server.js

&nbsp;   ```

&nbsp;   You should see the message: `🚀 Backend server is running on http://localhost:3001`



\-   \*\*Terminal 2: Start the Frontend\*\*

&nbsp;   (Navigate to the `frontend` directory)

&nbsp;   ```bash

&nbsp;   npm run dev

&nbsp;   ```

&nbsp;   Open the local URL provided in your browser, typically `http://localhost:5173`.



\## 🔮 Future Improvements



\-   \*\*Image Upload:\*\* Allow users to upload photos of road safety issues for multimodal AI analysis.

\-   \*\*Geolocation:\*\* Tag reports with GPS coordinates for precise location mapping.

\-   \*\*Advanced RAG:\*\* Implement vector embeddings for the database to enable more nuanced semantic search.

\-   \*\*User Authentication \& History:\*\* Allow users to log in and view a history of their submitted reports.



---

\*\*Developed by Team The Safe-T-Bytes\*\*

