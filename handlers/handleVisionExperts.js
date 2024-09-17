const { openAi } = require("../utils/instances");
const { systemPromptStep1, userPromptStep1 } = require("../utils/prompts");

const handleVisionExperts = async (base64Image) => {
  console.time("handleVisionExperts");
  try {
    const response = await openAi.post("/chat/completions", {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPromptStep1,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: userPromptStep1,
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

    let { analisysDescription, data } = JSON.parse(
      response.data?.choices[0]?.message?.content.replace(
        /```json\n|\n```/g,
        ""
      )
    );

    console.log("handleVisionExperts analisysDescription", analisysDescription);
    console.log("handleVisionExperts data", data);
    return {
      analisysDescription,
      data,
      from: `handleVisionExperts`,
    };
  } catch (error) {
    console.error(
      "Error al enviar imagen a OpenAI (handleVisionExperts):",
      error
    );
  }
  console.timeEnd("handleVisionExperts");
};

module.exports = { handleVisionExperts };
