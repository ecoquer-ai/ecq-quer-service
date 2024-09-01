const { handleResponseInBackground } = require("./handleResponseInBackground");
const { handleClassifyQuestion } = require("./handleClassifyQuestion");
const { handleCreateAssistant } = require("./handleCreateAssistant");
const { handleRoutineGenerator } = require("./handleRoutineGenerator");
const { handleVisionExperts } = require("./handleVisionExperts");
const { handleNewMessage } = require("./handleNewMessage");
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
