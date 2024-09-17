const { systemPromptStep2, userPromptStep2 } = require("../utils/prompts");
const { openAi } = require("../utils/instances");

const handleValidationAndRefinement = async (
  base64Image,
  width,
  height,
  initialDetection
) => {
  console.time("handleValidationAndRefinement");
  try {
    const response = await openAi.post("/chat/completions", {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPromptStep2(width, height),
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: userPromptStep2(initialDetection),
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

    console.log(
      "handleValidationAndRefinement analisysDescription",
      analisysDescription
    );
    console.log("handleValidationAndRefinement data", data);

    return { analisysDescription, data, from: `handleValidationAndRefinement` };
  } catch (error) {
    console.error(
      "Error al enviar imagen a OpenAI (handleValidationAndRefinement):",
      error
    );
  }
  console.timeEnd("handleValidationAndRefinement");
};

module.exports = { handleValidationAndRefinement };
