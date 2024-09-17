const { handleResponseInBackground } = require("./handleResponseInBackground");
const { handleClassifyQuestion } = require("./handleClassifyQuestion");
const { handleCreateAssistant } = require("./handleCreateAssistant");
const { handleRoutineGenerator } = require("./handleRoutineGenerator");
const { handleVisionExperts } = require("./handleVisionExperts");
const { handleNewMessage } = require("./handleNewMessage");
const {
  handleValidationAndRefinement,
} = require("./handleValidationAndRefinement");
const { handleOrchestrator } = require("./handleOrchestrator");
const {
  handleNutritionPlanGenerator,
} = require("./handleNutritionPlanGenerator");
const {
  handleNutritionistExpert,
} = require("./nutrition/handleNutritionistExpert");
const {
  handleNutritionistExpertLvl2,
} = require("./nutrition/handleNutritionistExpertLvl2");

module.exports = {
  handleValidationAndRefinement,
  handleOrchestrator,
  handleNewMessage,
  handleVisionExperts,
  handleCreateAssistant,
  handleClassifyQuestion,
  handleRoutineGenerator,
  handleNutritionistExpert,
  handleResponseInBackground,
  handleNutritionistExpertLvl2,
  handleNutritionPlanGenerator,
};
