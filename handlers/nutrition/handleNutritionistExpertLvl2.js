const { nutritionistExpertLvl2Instructions } = require("../../utils/static");
const { openAi } = require("../../utils/instances");

const handleNutritionistExpertLvl2 = async (message) => {
  console.time("handleNutritionistExpertLvl2");
  try {
    if (!message) {
      throw new Error("No user message provided");
    }
    let response = await openAi.post("/chat/completions", {
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: nutritionistExpertLvl2Instructions,
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
    console.log("handleNutritionistExpertLvl2 message:", message);
    console.timeEnd("handleNutritionistExpertLvl2");
    return response;
  } catch (error) {
    console.timeEnd("handleNutritionistExpertLvl2");
    console.error("Error in handleNutritionistExpertLvl2", error.message);
    return { error: error.message };
  }
};

module.exports = { handleNutritionistExpertLvl2 };
