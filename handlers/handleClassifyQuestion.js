const { classifyQuestionInstructions } = require("../utils/static");
const { openAi } = require("../utils/instances");

const handleClassifyQuestion = async (userMessage) => {
  console.time("handleClassifyQuestion");
  try {
    if (!userMessage) {
      throw new Error("No user message provided");
    }
    const response = await openAi.post("/chat/completions", {
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: classifyQuestionInstructions,
        },
        {
          role: "user",
          content: `${userMessage}`,
        },
      ],
      temperature: 0.0,
    });

    if (
      !response.data ||
      !response.data.choices ||
      response.data.choices.length === 0
    ) {
      throw new Error("Invalid response from OpenAI");
    }

    const { category } = JSON.parse(response.data.choices[0].message.content);
    console.log("predictedCategory", category);
    console.timeEnd("handleClassifyQuestion");
    return { category };
  } catch (error) {
    console.timeEnd("handleClassifyQuestion");
    console.error("Error in handleClassifyQuestion", error.message);
    return { error: error.message };
  }
};

module.exports = { handleClassifyQuestion };
