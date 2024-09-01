const handleNutritionEntry = {
  type: "function",
  function: {
    name: "handleNutritionEntry",
    description:
      "Basado en el mensaje del usuario, esta funcion genera una entrada de alimentos, utilizando como parametros la información proporcionada por el modelo de clasificación de alimentos.",
    parameters: {
      type: "object",
      properties: {
        analisysDescription: {
          type: "string",
          description:
            "Descripción de los alimentos identificados en el mensaje. Debe incluir información sobre calorias de cada alimento.",
        },
        foodItems: {
          type: "array",
          items: {
            type: "object",
            properties: {
              category: {
                type: "string",
                description:
                  "Categoría del alimento. Puede ser: water, fruits, proteins, carbs, fats, junkFood, uncategorized.",
                enum: [
                  "water",
                  "fruits",
                  "proteins",
                  "carbs",
                  "fats",
                  "junkFood",
                  "uncategorized",
                ],
              },
              description: {
                type: "string",
                description: "Descripción corta del alimento.",
              },
              portionSize: {
                type: "object",
                properties: {
                  unit: {
                    type: "string",
                    description: "Unidad de medida de la porción (g, ml).",
                    enum: ["g", "ml"],
                  },
                  value: {
                    type: "number",
                    description: "Cantidad de la porción.",
                  },
                },
              },
              calories: {
                type: "number",
                description: "Cantidad de calorías por porción.",
              },
              proteins: {
                type: "number",
                description: "Gramos de proteínas por porción.",
              },
              carbs: {
                type: "number",
                description: "Gramos de carbohidratos por porción.",
              },
              fats: {
                type: "number",
                description: "Gramos de grasas por porción.",
              },
              fiber: {
                type: "number",
                description: "Gramos de fibra por porción.",
              },
              water: {
                type: "number",
                description: "Contenido de agua por porción en ml.",
              },
            },
            required: [
              "category",
              "description",
              "portionSize",
              "calories",
              "proteins",
              "carbs",
              "fats",
              "fiber",
              "water",
            ],
          },
        },
      },
      required: ["analisysDescription", "foodItems"],
    },
  },
};

module.exports = handleNutritionEntry;
