const handleNutritionPlanGenerator = {
  type: "function",
  function: {
    name: "handleNutritionPlanGenerator",
    description:
      "Genera recomendaciones nutricionales basadas en la clasificación de imágenes de alimentos, utilizando la información proporcionada por el modelo de visión sobre categorías alimenticias, calorías y nutrientes.",
    parameters: {
      type: "object",
      properties: {
        category: {
          type: "string",
          description:
            "Categoría del alimento identificado en la imagen (water, fruits, proteins, carbs, fats, junkFood y uncategorized).",
        },
        description: {
          type: "string",
          description:
            "Descripción de la imagen centrada en el alimento identificado",
        },
        water: {
          type: "number",
          description:
            "estimación de los ml de agua (solo si corresponde, dejar en 0 en caso de que category sea uncategorized)",
        },
        calories: {
          type: "number",
          description:
            "estimación de calorías (solo si corresponde, dejar en 0 en caso de que category sea uncategorized)",
        },
        proteins: {
          type: "number",
          description:
            "estimación de proteinas (solo si corresponde, dejar en 0 en caso de que category sea uncategorized)",
        },
        carbs: {
          type: "number",
          description:
            "estimación de carbohidratos (solo si corresponde, dejar en 0 en caso de que category sea uncategorized)",
        },
        fats: {
          type: "number",
          description:
            "estimación de grasas (solo si corresponde, dejar en 0 en caso de que category sea uncategorized)",
        },
        fiber: {
          type: "number",
          description:
            "estimación de la fibra (solo si corresponde, dejar en 0 en caso de que category sea uncategorized)",
        },
      },
      required: [
        "category",
        "description",
        "water",
        "calories",
        "proteins",
        "carbs",
        "fats",
        "fiber",
      ],
    },
  },
};

module.exports = { handleNutritionPlanGenerator };
