import nlp from "compromise";

// Split text into chunks (for large text)
function splitText(text, chunkSize = 2000) {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}

// Simple summarizer for one chunk
function summarizeChunk(text) {
  const doc = nlp(text);

  // Get sentences
  const sentences = doc.sentences().out("array");

  // Take first 3 sentences
  return sentences.slice(0, 3);
}

// Main function
export async function summarizeLongText(text) {
  const chunks = splitText(text);

  let allSentences = [];

  for (let chunk of chunks) {
    const summary = summarizeChunk(chunk);
    allSentences.push(...summary);
  }

  // Final top 3 sentences
  const finalSummary = allSentences
    .slice(0, 3)
    .map(s => "• " + s)
    .join("\n");

  return finalSummary || "No summary generated";
}