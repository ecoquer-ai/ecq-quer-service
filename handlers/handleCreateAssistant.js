const fs = require("fs");
const path = require("path");
const { openAi } = require("../utils/instances");
const { createAssistantInstructions } = require("../utils/static");
const { tools } = require("../tools");

const handleCreateAssistant = async (threadId) => {
  const assistantFilePath = path.join(__dirname, "../utils/assistant.json");

  if (fs.existsSync(assistantFilePath)) {
    const assistantData = JSON.parse(
      fs.readFileSync(assistantFilePath, "utf8")
    );
    console.log("Loaded existing assistant ID.");
    return assistantData.assistant_id;
  } else {
    console.log("CREANDO ASISTENTE");
    try {
      const assistantResponse = await openAi.post("/assistants", {
        instructions: createAssistantInstructions,
        model: "gpt-4o-mini",
        tools,
      });

      const assistantId = assistantResponse.data.id;

      fs.writeFileSync(
        assistantFilePath,
        JSON.stringify({ assistantId, threadId }, null, 2)
      );
      console.log("Created a new assistant and saved the ID.");
      return assistantId;
    } catch (error) {
      console.log("Error creating assistant:", error.response.data);
    }
  }
};

module.exports = { handleCreateAssistant };
