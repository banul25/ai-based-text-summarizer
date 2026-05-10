AI Text Summarizer


 Project Overview

AI Text Summarizer is a full-stack web application that summarizes large text or PDF documents using Artificial Intelligence.
Users can:
Enter manual text
Upload PDF files
Generate concise summaries instantly


The project uses:

React.js for frontend
Node.js + Express.js for backend
Hugging Face AI API for summarization
pdf-parse for extracting text from PDF files


 Features

✅ Manual text summarization
✅ PDF upload support
✅ AI-generated summaries
✅ Handles large text using chunking
✅ REST API integration
✅ React frontend UI
✅ Express backend server
✅ Error handling


 Technologies Used

Frontend
React.js
Axios
Backend
Node.js
Express.js
Multer
pdf-parse
AI API
Hugging Face Inference API
facebook/bart-large-cnn model

Project Structure
  ``````````
AI-BASED-TEXT-SUMMARIZER/
│
├── backend/
│   │
│   ├── node_modules/
│   │
│   ├── routes/
│   │   └── summarize.js
│   │
│   ├── services/
│   │   ├── aiService.js
│   │   └── pdfService.js
│   │
│   ├── uploads/
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── tmp_check_env.mjs
│
├── frontend/
│   │
│   ├── pages/
│   │
│   ├── index.html
│   ├── index.js
│   └── package.json
│
└── README.md
