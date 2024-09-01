const handleRoutineGenerator = {
  type: "function",
  function: {
    name: "handleRoutineGenerator",
    description:
      "Genera una rutina de entrenamiento basada en categorías de imágenes proporcionadas, separando las operaciones en funciones cohesivas.",
    parameters: {
      type: "object",
      properties: {
        imagesCategories: {
          type: "array",
          items: {
            type: "object",
            properties: {
              category: {
                type: "string",
                description: "Descripción de la categoría de imagen.",
              },
              categoryCode: {
                type: "number",
                description: "Código único de la categoría de imagen.",
              },
              path: {
                type: "string",
                description: "Ruta de acceso a la imagen.",
              },
              index: {
                type: "number",
                description: "Índice de la imagen en el array.",
              },
            },
            required: ["categoryCode", "category", "path", "index"],
          },
        },
      },
      required: ["imagesCategories"],
    },
  },
};

module.exports = { handleRoutineGenerator };
