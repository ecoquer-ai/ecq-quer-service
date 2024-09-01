const {
  systemPromptNutrition,
  userPromptNutrition,
  // systemPromptExercise,
  // userPromptExercise,
} = require("../utils/static");
const { openAi } = require("../utils/instances");

const handleVisionExperts = async (base64Image) => {
  const cameraTypes = {
    nutrition: {
      systemPrompt: systemPromptNutrition,
      userPrompt: userPromptNutrition,
    },
    // exercise: {
    //   systemPrompt: systemPromptExercise,
    //   userPrompt: userPromptExercise,
    // },
  };

  const systemPrompt = cameraTypes["nutrition"].systemPrompt;
  const userPrompt = cameraTypes["nutrition"].userPrompt;

  try {
    const response = await openAi.post("/chat/completions", {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: userPrompt,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
                detail: "high",
              },
            },
          ],
        },
      ],
      max_tokens: 2000,
    });

    console.log(
      "response.data?.choices[0]?.message?.content",
      response.data?.choices[0]?.message?.content
    );

    let ImageAnalysisResponse = JSON.parse(
      response.data?.choices[0]?.message?.content.replace(
        /```json\n|\n```/g,
        ""
      )
    );

    let data = {
      ImageAnalysisResponse,
      from: `vision model`,
    };

    console.log("data", data);

    return data;
  } catch (error) {
    console.error("Error al enviar imagen a OpenAI:", error);
  }
};

module.exports = { handleVisionExperts };
