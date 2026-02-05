import Groq from "groq-sdk";

export async function generateCoverLetter(data) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not loaded");
  }

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const prompt = `
You are a professional HR expert.

Write a professional, ATS-friendly cover letter.

Candidate Name: ${data.name}
Company Name: ${data.company}
Job Role: ${data.role}

Key Skills:
${data.skills}

Job Description:
${data.jobDescription}

Rules:
- 3 to 4 paragraphs
- Professional tone
- No bullet points
- Clear formatting
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 800,
  });

  return response.choices[0].message.content;
}
