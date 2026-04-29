const { PDFParse } = require("pdf-parse");

const extractTextFromPDF = async (fileBuffer) => {
  try {
    const parser = new PDFParse({ data: fileBuffer });
    const result = await parser.getText();

    await parser.destroy(); // Free memory after parsing
    
    return result.text;
  } catch (error) {
    console.error("PDF Parsing Error:", error.message);
    throw new Error("Failed to extract text from PDF");
  }
};

module.exports = extractTextFromPDF;
