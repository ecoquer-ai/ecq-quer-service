const { openAi } = require("../utils/instances");

const handleVisionFilterType = async (base64Image) => {
  try {
    const response = await openAi.post("/chat/completions", {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
            Adjunte una imagen para su análisis. Responda según configuración establecida en el sistema.
            IMPORTANTE:
             - DATE UN GRAN RESPIRO PARA RESPONDER Y COMIENZA PASO A PASO, PRIMERO DETERMINAR SI LA IMAGEN CORRESPONDE A UN ALIMENTO, BEBIDA O NO ALIMENTICIO.
             `,
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
                detail: "low",
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
      from: `${cameraType} vision model`,
    };

    console.log("data", data);

    return data;
  } catch (error) {
    console.error("Error al enviar imagen a OpenAI:", error);
  }
};

module.exports = { handleVisionFilterType };
