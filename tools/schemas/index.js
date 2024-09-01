const { handleRoutineGenerator } = require("./routineGeneratorSchema");
const {
  handleNutritionPlanGenerator,
} = require("./nutritionPlanGeneratorSchema");
const handleNutritionEntry = require("./nutritionEntrySchema");

module.exports = {
  handleRoutineGenerator,
  handleNutritionPlanGenerator,
  handleNutritionEntry,
};
