const { openAi } = require("../../../utils/instances");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const handleGenericClassification = async (
  base64Image,
  systemPrompt,
  userPrompt,
  retries = 5,
  delay = 1000
) => {
  console.time(`handleGenericClassification_${retries}`); // Etiqueta con el número de reintentos

  try {
    // Realizar la solicitud a OpenAI
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
                detail: "low",
              },
            },
          ],
        },
      ],
      max_tokens: 2000,
    });

    const ImageAnalysisResponse = JSON.parse(
      response.data?.choices[0]?.message?.content.replace(
        /```json\n|\n```/g,
        ""
      )
    );

    console.log("ImageAnalysisResponse", ImageAnalysisResponse);

    return {
      data: {
        ImageAnalysisResponse,
        from: "vision model",
      },
      status: response.status,
      error: null,
    };
  } catch (error) {
    const errorStatus = error.response?.status || 500;

    if ((errorStatus >= 500 || errorStatus === 429) && retries > 0) {
      console.warn(
        `Error ${errorStatus}, reintentando en ${delay / 1000} segundos...`
      );
      await sleep(delay);
      return handleGenericClassification(
        base64Image,
        systemPrompt,
        userPrompt,
        retries - 1,
        delay * 2
      );
    }

    return {
      data: null,
      status: errorStatus,
      error: error.response?.data || "Error inesperado al procesar la imagen.",
    };
  } finally {
    console.timeEnd(`handleGenericClassification_${retries}`); // Cerrar el temporizador correcto
  }
};

module.exports = { handleGenericClassification };
