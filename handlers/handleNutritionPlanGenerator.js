const handleNutritionPlanGenerator = (functionArguments) => {
  console.log(
    "handleNutritionPlanGenerator: functionArguments",
    functionArguments
  );

  // // Datos y consejos nutricionales personalizados para cada categoría
  // const nutritionAdvice = {
  //   fruits: {
  //     advice:
  //       "Incluye una variedad de frutas para obtener una amplia gama de nutrientes. Ideal para snacks saludables y postres.",
  //     servingTips:
  //       "2-3 piezas de fruta al día, preferiblemente de distintos colores para maximizar la variedad de nutrientes.",
  //   },
  //   proteins: {
  //     advice:
  //       "Elige proteínas magras para aportar los aminoácidos esenciales sin un exceso de grasas saturadas.",
  //     servingTips:
  //       "150-200g por comida. Varía entre carnes, pescados y fuentes vegetales como legumbres.",
  //   },
  //   carbs: {
  //     advice:
  //       "Prefiere carbohidratos complejos para una liberación de energía más sostenida y una mejor digestión.",
  //     servingTips:
  //       "100-150g por comida, integrando granos enteros y minimizando los carbohidratos refinados.",
  //   },
  //   fats: {
  //     advice:
  //       "Las grasas saludables son esenciales para la salud del corazón y el cerebro.",
  //     servingTips:
  //       "Incluye 30-40g de grasas saludables al día, como aceite de oliva, aguacates y frutos secos.",
  //   },
  //   junkFood: {
  //     advice:
  //       "Limita el consumo de alimentos procesados, ya que suelen contener altos niveles de azúcares, grasas y sal.",
  //     servingTips:
  //       "Si es necesario, no más del 10% de tu ingesta diaria calórica debería provenir de estos alimentos.",
  //   },
  // };

  let nutritionPlan;

  if (functionArguments.category !== "uncategorized") {
    const { water, calories, proteins, carbs, fats, fiber, category } =
      functionArguments;
    nutritionPlan = {
      status: "success",
      water,
      category,
      calories,
      proteins,
      carbs,
      fats,
      fiber,
      // advice: nutritionAdvice[category].advice,
      // servingTips: nutritionAdvice[category].servingTips,
    };
    console.log("nutritionPlan handleNutritionPlanGenerator", nutritionPlan);
    return {
      nutritionPlan,
      assistantInstructions: `Se ha generado el plan nutricional exitosamente. Revise cada recomendación para obtener una guía completa y personalizada.`,
    };
  } else {
    return {
      nutritionPlan: {
        status: "error",
      },
      assistantInstructions: `No se ha podido generar un plan nutricional para la categoría seleccionada. Por favor, intenta con otra categoría.`,
    };
  }
};

module.exports = { handleNutritionPlanGenerator };
