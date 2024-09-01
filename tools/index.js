const {
  handleNutritionEntry,
  // handleNutritionPlanGenerator,
  handleRoutineGenerator,
} = require("./schemas");

const tools = [
  // handleNutritionPlanGenerator,
  handleRoutineGenerator,
  handleNutritionEntry,
];

module.exports = { tools };
