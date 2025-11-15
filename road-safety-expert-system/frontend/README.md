# Frontend: Road Safety Intervention GPT

This directory contains the complete source code for the user-facing interface of the Road Safety Intervention GPT. This application is built as a modern, responsive Single-Page Application (SPA) using React and Vite.

## 📜 Description

The frontend provides an intuitive and professional interface for users to describe road safety issues in natural language. It communicates with a dedicated backend server to receive AI-powered analysis and recommendations. The results are then displayed in a beautifully formatted, easy-to-understand "Intervention Report."

## ✨ Key Features

-   **Intuitive User Interface:** A clean, minimalist design focused on ease of use, allowing anyone to quickly describe a problem and get a solution.
-   **Real-time AI Analysis:** Seamlessly communicates with the backend to provide AI-generated reports without leaving the page.
-   **Professional Report Display:** Renders the AI's response in a structured, credible `ReportCard` format, complete with official references.
-   **Advanced Shareability:**
    -   Generates a unique, shareable link for each report.
    -   Displays a scannable QR code for easy access on mobile devices.
-   **Client-Side Routing:** Utilizes `react-router-dom` to handle dedicated, shareable report pages.
-   **Polished User Experience:** Includes loading skeletons and clear error messages to keep the user informed at every step.
-   **Fully Responsive:** Built with Tailwind CSS for a flawless experience on desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

-   **Framework:** [React](https://reactjs.org/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Routing:** [React Router DOM](https://reactrouter.com/)
-   **QR Code Generation:** [qrcode](https://www.npmjs.com/package/qrcode)

## 🚀 Getting Started

Follow these instructions to get the frontend development server running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 18.x or higher is recommended)
-   The [backend server](../backend/) for this project **must be running** first.

### Installation & Setup

1.  **Navigate to the frontend directory:**
    From the project's root folder, open your terminal and run:
    ```bash
    cd frontend
    ```

2.  **Install NPM packages:**
    This will install all the necessary dependencies listed in `package.json`.
    ```bash
    npm install
    ```

### Running the Application

1.  **Start the backend server:**
    Open a **separate terminal**, navigate to the `backend` directory, and run `node server.js`.

2.  **Start the frontend development server:**
    In your terminal (which should still be in the `frontend` directory), run:
    ```bash
    npm run dev
    ```

3.  **Open the application:**
    The server will start, and you will see a message in the terminal. Open your browser and navigate to the local URL provided, which is typically:
    > `http://localhost:5173`

The application should now be running, and you can begin testing.