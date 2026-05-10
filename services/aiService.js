import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

/**
 * Summarizes text using the BART Large CNN model from Hugging Face.
 * @param {string} text - The long-form text to summarize.
 * @returns {Promise<string>} - The summarized text.
 */
export async function summarizeLongText(text) {
  // 1. Validation: Ensure text isn't empty or too short
  if (!text || text.length < 50) {
    return "Text is too short to summarize. Please provide at least 50 characters.";
  }

  try {
    // 2. Request to Hugging Face Inference API
    // Model: facebook/bart-large-cnn (Industry standard for summarization)
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      { 
        inputs: text,
        parameters: {
          max_length: 150,
          min_length: 40,
          do_sample: false
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    // 3. Extraction: The API returns an array; we grab the first summary
    if (response.data && response.data[0]) {
      return response.data[0].summary_text;
    } else {
      throw new Error("Unexpected response format from AI");
    }

  } catch (error) {
    console.error("AI Service Error:", error.response?.data || error.message);
    
    // Check if the model is still loading (common with free API)
    if (error.response?.data?.error?.includes("loading")) {
      return "The AI model is currently waking up. Please try again in 20 seconds.";
    }

    return "Failed to generate summary. Please check your API token or network.";
  }

}
