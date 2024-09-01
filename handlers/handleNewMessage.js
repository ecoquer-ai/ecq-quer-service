const { handleResponseInBackground } = require("./handleResponseInBackground");
const { openAi } = require("../utils/instances");

const handleNewMessage = async (threadId, assistantId, message) => {
  try {
    // Envío del mensaje del usuario
    await openAi.post(`/threads/${threadId}/messages`, {
      role: "user",
      content: message,
    });

    // Iniciar la ejecución del asistente
    const response = await openAi.post(`/threads/${threadId}/runs`, {
      assistant_id: assistantId,
    });

    const runId = response.data.id;

    // Manejo de la respuesta en segundo plano
    const assistantRes = await handleResponseInBackground(threadId, runId);

    if (assistantRes.error) {
      throw new Error(assistantRes.error);
    }

    return assistantRes;
  } catch (error) {
    console.error("Error in handleNewMessage:", error.message);
    return { error: "Error retrieving response" };
  }
};

module.exports = { handleNewMessage };
