const extractTextFromPDF = require("../utils/pdfParser");
const analyzeResumeWithAI = require("../services/aiService");

const analyzeResume = async (req, res) => {
  try {
    // 1. Validate inputs
    if (!req.file) {
      return res.status(400).json({ error: "Resume PDF is required" });
    }

    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ error: "Job description is required" });
    }

    // 2. Extract PDF text
    const resumeText = await extractTextFromPDF(req.file.buffer);

    // 3. Call AI service
    const analysis = await analyzeResumeWithAI(resumeText, jobDescription);

    // 4. Send response
    return res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error("Controller Error:", error.message);

    return res.status(500).json({
      success: false,
      error: "Something went wrong while analyzing resume",
    });
  }
};

module.exports = {
  analyzeResume,
};
