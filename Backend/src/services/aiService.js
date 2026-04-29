const { GoogleGenerativeAI } = require("@google/generative-ai");

const analyzeResumeWithAI = async (resumeText, jobDescription) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    // console.log(apiKey);
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing from environment variables.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an expert ATS (Applicant Tracking System).

Analyze the given resume against the job description.

Return ONLY a valid JSON response with:
- match_score (0-100)
- strengths (array)
- missing_skills (array)
- improvement_suggestions (array)

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    // const text = response.text();
    let text = response.text();

    // Remove markdown formatting if present
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();    

    // Try parsing JSON safely
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.error("JSON Parse Error:", text);
      throw new Error("AI returned invalid JSON");
    }

    return parsed;
  } catch (error) {
    console.error("AI Service Error:", error.message);
    throw new Error("Failed to analyze resume");
  }
};

module.exports = analyzeResumeWithAI;
