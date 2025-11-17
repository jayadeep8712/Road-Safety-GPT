// In backend/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { parse } = require('csv-parse/sync');

const app = express();
const PORT = process.env.PORT || 3001;  

// --- Middleware ---
const allowedOrigins = [
  'http://localhost:5173', // Your local frontend for development
  'https://road-safety-expert-system.vercel.app' // Your deployed Vercel frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());  

// --- Database Loading ---
const filePath = path.resolve(__dirname, 'road_safety_interventions.csv');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Use the robust library to parse the CSV
const database = parse(fileContent, {
    columns: true,  
    skip_empty_lines: true,
    on_record: (record) => {
        return {
            s_no: record['S. No.'],
            problem: record.problem,
            category: record.category,
            type: record.type,
            data: record.data,
            code: record.code,
            clause: record.clause
        };
    }
});

console.log(`✅ Database loaded: ${database.length} records parsed.`);
console.log('First two records for verification:', database.slice(0, 2));

// --- Gemini AI Setup ---
if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in the .env file.");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- API Endpoint ---
app.post('/api/generate-report', async (req, res) => {
  console.log("➡️  Received request to /api/generate-report");
  try {
    const { userInput } = req.body;
    if (!userInput || userInput.trim().length < 10) {
        return res.status(400).json({ error: 'Please provide a more detailed description.' });
    }
    
    const lowerUserInput = userInput.toLowerCase();
    const keywords = lowerUserInput.split(/\s+/).filter(word => word.length > 3);
    const relevantDocs = database.filter(doc => {
      const searchableText = `${doc.problem} ${doc.category} ${doc.type}`.toLowerCase();
      return keywords.some(keyword => searchableText.includes(keyword));
    });

    if (relevantDocs.length === 0) {
        return res.status(200).json({ error: "No relevant interventions found in the database. Please rephrase." });
    }

    const context = relevantDocs.map(doc => `Record S.No.: ${doc.s_no}\nProblem: ${doc.problem}\nType: ${doc.type}\nData: ${doc.data}\nCode: ${doc.code}\nClause: ${doc.clause}`).join('\n---\n');
    
    const masterPrompt = `You are the "Road Safety Expert System (RSES)", a helpful and highly specialized AI assistant. Your single purpose is to analyze a user's description of a road safety issue and recommend a precise intervention based ONLY on the technical database provided in the CONTEXT. You must operate under the following strict rules:

---
**Core Identity & Persona:**
- You are an expert system, not a general conversationalist.
- You must always be helpful, polite, and professional.
- Your knowledge is STRICTLY LIMITED to the information provided in the CONTEXT. You must never invent, assume, or use any external information.

**Rule 1: Handling Meta & Off-Topic Questions**
If the user asks who you are, how you work, or asks a question unrelated to road safety (e.g., weather, jokes), you MUST IGNORE the CONTEXT. Your response must be this exact JSON object:
{"error": "I am the Road Safety Expert System. My function is to provide intervention recommendations for road safety problems based on official guidelines. Please describe a specific issue you've observed."}

**Rule 2: The Core Analysis Task**
If the user describes a valid road safety issue, you must perform your analysis.
1.  Search the CONTEXT to find the single most relevant intervention.
2.  If a match is found, you MUST construct a JSON object with the following keys: "greeting", "problemIdentified", "intervention", "explanation", "referenceCode", "referenceClause".
3.  The "greeting" value is MANDATORY: "Based on the official guidelines, I have analyzed your report and recommend the following intervention:"
4.  **problemIdentified**: Synthesize a short, clear title by combining the 'problem' and 'type' from the context. For example: "Damaged STOP Sign" or "Improper Placement of Gap in Median Sign".
5.  **intervention**: Synthesize a concise, one-sentence action based on the 'data' field. For example: "Replace the damaged sign to ensure it meets regulatory standards." or "Install a 'Gap in Median' sign ahead of the opening in the carriageway."
6.  **explanation**: Extract the detailed specifications and guidelines from the 'data' field and format them as a string with markdown bullet points (e.g., "- Point 1\\n- Point 2").
7.  The 'referenceCode' and 'referenceClause' keys must be populated directly from the best-matching record in the CONTEXT.

**Rule 3: Handling No Match Found**
If the user describes a real road safety issue, but you cannot find a confident match within the CONTEXT, your response must be this exact JSON object:
{"error": "Thank you for the report. I could not find a specific intervention for that issue in my database. To help me find the right solution, please provide more details or use terms like 'damaged sign', 'faded road marking', or 'improperly placed'."}

**CRITICAL FINAL INSTRUCTION:**
Your entire output must ALWAYS be a single, raw JSON object and nothing else. Do not add any text before or after the JSON.
---

CONTEXT:
---
${context}
---

USER'S PROBLEM: "${userInput}"`;
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(masterPrompt);
    const responseText = result.response.text();
    const cleanedJsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const jsonResponse = JSON.parse(cleanedJsonString);
    
    console.log("✅ Successfully generated AI response.");
    res.status(200).json(jsonResponse);

  } catch (error) {
    console.error('❌ API Handler Error:', error);
    res.status(500).json({ error: 'An internal server error occurred on the backend.' });
  }
});


app.post('/api/create-share', async (req, res) => {
  console.log("➡️  Received request to create share link");
  try {
    const reportData = req.body;
    if (!reportData || !reportData.problemIdentified) {
      return res.status(400).json({ error: 'Invalid report data provided to create a share link.' });
    }

    const response = await fetch('https://jsonblob.com/api/jsonBlob', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(reportData),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`JSONBlob API Error: ${response.status} - ${errorBody}`);
      throw new Error('Failed to upload report data to JSONBlob.');
    }

    const blobUrl = response.headers.get('Location');
    const blobId = blobUrl.split('/').pop();

    console.log(`✅ Successfully created share link with ID: ${blobId}`);
    // Send just the unique ID back to the frontend
    res.status(200).json({ shareId: blobId });

  } catch (error) {
    console.error('❌ Error creating share link:', error);
    res.status(500).json({ error: 'Failed to create the shareable link.' });
  }
});


// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
});