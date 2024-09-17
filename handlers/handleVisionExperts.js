const { openAi } = require("../utils/instances");
const { systemPromptStep1, userPromptStep1 } = require("../utils/prompts");

const handleVisionExperts = async (base64Image) => {
  console.time("handleVisionExperts");

  const maxRetries = 2;
  let attempts = 0;
  let successful = false;
  let result = null;

  while (attempts < maxRetries && !successful) {
    try {
      attempts++;

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
                  detail: "low",
                },
              },
            ],
          },
        ],
        max_tokens: 2000,
      });

      let content = response.data?.choices[0]?.message?.content || "";
      content = content.replace(/```json\n|\n```/g, "");
      console.log("handleVisionExperts, content", content);

      if (isValidJson(content)) {
        const parsedContent = JSON.parse(content);

        const { analisysDescription, data } = parsedContent;

        console.log(
          "handleVisionExperts analisysDescription",
          analisysDescription
        );
        console.log("handleVisionExperts data", data);

        result = {
          analisysDescription,
          data,
          from: `handleVisionExperts`,
        };

        successful = true;
      } else {
        throw new SyntaxError("Invalid JSON format received from OpenAI.");
      }
    } catch (error) {
      console.error(
        `Error al enviar imagen a OpenAI (handleVisionExperts), intento ${attempts}:`,
        error
      );

      if (attempts >= maxRetries) {
        console.error(`Failed after ${maxRetries} attempts.`);
        break;
      } else {
        console.log(`Retrying... (${attempts}/${maxRetries})`);
      }
    }
  }

  console.timeEnd("handleVisionExperts");

  return result;
};

const isValidJson = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = { handleVisionExperts };
