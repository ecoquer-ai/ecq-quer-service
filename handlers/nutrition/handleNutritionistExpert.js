const { systemNutritionistExpert } = require("../../utils/static");
const { openAi } = require("../../utils/instances");

const handleNutritionistExpert = async (message) => {
  console.time("handleNutritionistExpert");
  try {
    if (!message) {
      throw new Error("No message provided");
    }
    let response = await openAi.post("/chat/completions", {
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: systemNutritionistExpert,
        },
        {
          role: "user",
          content: `${message}`,
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

    response = JSON.parse(response.data.choices[0].message.content);
    console.log("handleNutritionistExpert response", response);
    console.timeEnd("handleNutritionistExpert");
    return response;
  } catch (error) {
    console.timeEnd("handleNutritionistExpert");
    console.error("Error in handleNutritionistExpert", error.message);
    return { error: error.message };
  }
};

module.exports = { handleNutritionistExpert };
