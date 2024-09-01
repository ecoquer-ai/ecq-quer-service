const { nutritionService } = require("../../utils/instances");

const handleNutritionEntry = async (functionArguments) => {
  console.log("handleNutritionEntry: ...functionArguments", functionArguments);

  const { analisysDescription, foodItems } = functionArguments;

  if (!foodItems || !Array.isArray(foodItems)) {
    console.error("Invalid foodItems data:", foodItems);
    return {
      nutritionEntry: "Error: Invalid foodItems data",
      assistantInstructions:
        "No se ha podido añadir la entrada de nutrición al usuario debido a datos inválidos.",
    };
  }

  const decodedAnalisysDescription = JSON.parse(`"${analisysDescription}"`);
  const decodedFoodItems = foodItems.map((item) => {
    return {
      ...item,
      description: JSON.parse(`"${item.description}"`),
    };
  });

  console.log("decodedAnalisysDescription", decodedAnalisysDescription);
  console.log("foodItems", decodedFoodItems);

  console.log("handleNutritionEntry nutritionService body", {
    userId: 1,
    aiModel: "quer-nutrition-model-v1",
    analisysDescription: decodedAnalisysDescription,
    foodItems: decodedFoodItems,
  });

  try {
    const resNutritionService = await nutritionService.post("/entry", {
      userId: 1,
      aiModel: "quer-nutrition-model-v1",
      analisysDescription: decodedAnalisysDescription,
      foodItems: decodedFoodItems,
    });

    console.log("resNutritionService", resNutritionService.data);
    return {
      assistantInstructions: "Se ha añadido la entrada de nutrición al usuario",
    };
  } catch (error) {
    console.error("Error in handleNutritionEntry", error.message);
    return {
      nutritionEntry: "Error in handleNutritionEntry",
      assistantInstructions:
        "No se ha podido añadir la entrada de nutrición al usuario",
    };
  }
};

module.exports = { handleNutritionEntry };
