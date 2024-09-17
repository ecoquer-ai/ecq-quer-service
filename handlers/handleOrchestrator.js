const { userPromptStep3, systemPromptStep3 } = require("../utils/prompts");
const { openAi } = require("../utils/instances");

const handleOrchestrator = async (
  base64Image,
  initialDetection,
  refinedDetection
) => {
  console.time("handleOrchestrator");
  try {
    const response = await openAi.post("/chat/completions", {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPromptStep3,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: userPromptStep3(initialDetection, refinedDetection),
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

    console.log("handleOrchestrator analisysDescription", analisysDescription);
    console.log("handleOrchestrator data", data);

    return {
      analisysDescription,
      data,
      from: `handleOrchestrator`,
    };
  } catch (error) {
    console.error(
      "Error al enviar imagen a OpenAI (analisysDescription):",
      error
    );
  }
  console.timeEnd("handleOrchestrator");
};

module.exports = { handleOrchestrator };
