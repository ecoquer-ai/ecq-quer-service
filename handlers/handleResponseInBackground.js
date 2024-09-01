const { openAi } = require("../utils/instances");
const {
  handleNutritionPlanGenerator,
} = require("./handleNutritionPlanGenerator");
const { handleRoutineGenerator } = require("./handleRoutineGenerator");
const { handleNutritionEntry } = require("./nutrition/handleNutritionEntry");

const handleResponseInBackground = async (threadId, runId) => {
  let runStatus;
  let attempts = 0;
  const maxAttempts = 20;
  const interval = 2500;

  let messages = [];
  let components = [];
  let toolsOutputs = [];

  do {
    try {
      const [statusResponse, messagesResponse] = await Promise.all([
        openAi.get(`/threads/${threadId}/runs/${runId}`),
        openAi.get(`/threads/${threadId}/messages`),
      ]);

      runStatus = statusResponse.data.status;
      messages = messagesResponse.data;

      if (runStatus === "completed") {
        return { messages, components };
      } else if (runStatus === "requires_action") {
        console.log("Action required.");
        const requiredAction =
          statusResponse.data.required_action.submit_tool_outputs.tool_calls;
        for (const action of requiredAction) {
          const funcName = action.function.name;
          console.log("funcName", funcName);
          const functionArguments = JSON.parse(action.function.arguments);
          if (funcName === "handleNutritionEntry") {
            const assistantInstructions = await handleNutritionEntry(
              functionArguments
            );
            console.log("assistantInstructions", assistantInstructions);
            toolsOutputs.push({
              tool_call_id: action.id,
              output: JSON.stringify(assistantInstructions),
            });
          } else {
            console.error("Unknown function:", funcName);
          }
        }
        await openAi.post(
          `/threads/${threadId}/runs/${runId}/submit_tool_outputs`,
          {
            tool_outputs: toolsOutputs,
          }
        );
      }
    } catch (error) {
      console.log("handleResponseInBackground error", error);
      return { error: "Error retrieving response" };
    }

    await new Promise((resolve) => setTimeout(resolve, interval));
    attempts++;
  } while (runStatus !== "completed" && attempts < maxAttempts);

  if (attempts >= maxAttempts) {
    return { error: "Timeout: La respuesta del asistente tardó demasiado." };
  }
};

module.exports = { handleResponseInBackground };
