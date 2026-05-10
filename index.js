import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const handleSubmit = async () => {
  try {
    const formData = new FormData();

    formData.append("text", text);

    if (file) {
      formData.append("file", file);
    }

    const res = await axios.post(
      "http://localhost:5000/api/summarize",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("SUMMARY:", res.data.summary);

    setSummary(res.data.summary || "No summary generated");

  } catch (error) {
    console.error(error);
    setSummary("Error generating summary");
  }
};
  return (
    <div style={{ padding: 20 }}>
      <h1>AI Text Summarizer</h1>

      <textarea
        rows="6"
        cols="50"
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br /><br />

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <br /><br />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      <h2>Summary:</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>{summary}</p>
    </div>
  );
}