const { openAi } = require("../../utils/instances");

const handleMotivationalImage = async (mentalState = "happy") => {
  console.log("mentalState", mentalState);

  console.time("handleMotivationalImage");
  try {
    const response = await openAi.post("/chat/completions", {
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `
              Eres un experto en crear descripciones únicas e inspiradoras que conduzcan a la creación de una imagen motivacional.
              IMPORTANTE: SOLO RESPONDER EN FORMATO JSON CON LA CLAVE "phrase" Y EL VALOR DE LA DESCRIPCIÓN MOTIVACIONAL.
              NO DEBES INCLUIR LA CLAVE "Ejemplos" EN TU RESPUESTA.
              SOLO DEBES PROPORCIONAR UNA DESCRIPCIÓN MOTIVACIONAL POR RESPUESTA.
              SOLO DEBES RETORNAR LA FRASE INSPIRADORA BASADA EN EL ESTADO DE ÁNIMO DEL USUARIO QUE SE TE SERÁ PROPORCIONADO.
              
              Esta es la estructura de la respuesta esperada:

               Ejemplos: 
              {
                "phrase": "Un nuevo día, una nueva oportunidad para ser la mejor versión de ti mismo.",
              }

              {
                "phrase": "La vida es un regalo, no un derecho. Aprovecha cada momento y hazlo inolvidable.",
              }

              {
                "phrase": "La vida es un viaje, no un destino. Disfruta del viaje y aprende de cada experiencia.",
              }
             `,
        },
        {
          role: "user",
          content: `
            Este es el estado actual de ánimo del usuario: ${mentalState}.
            Describa una frase motivacional para el usuario en base a su estado de ánimo.
            Actúa como si fueras un experto en crear descripciones únicas e inspiradoras que conduzcan a la creación de una imagen motivacional.
            Date un momento para pensar en una frase inspiradora que pueda ayudar al usuario a sentirse mejor.
            Recuerda que la frase debe ser motivacional y positiva.
            `,
        },
      ],
      temperature: 0.7,
    });

    const { phrase } = JSON.parse(response.data.choices[0].message.content);
    console.log("phrase generada:", phrase);

    // Prompt mejorado para generar la imagen
    const imageResponse = await openAi.post("/images/generations", {
      prompt: `
          Crea una imagen ultrarealista de 512x512 píxeles inspirada en la frase "${phrase}".
          Debe ser un paisaje natural inspirador que incluya animales en una situación motivacional.
          La imagen debe ser apropiada para todos los públicos, sin texto, sin personas ni marcas de agua.
          El estilo debe ser similar a una fotografía de alta calidad.
          IMPORTANTE: NO DEBES INCLUIR PERSONAS, MARCAS DE AGUA O TEXTO EN LA IMAGEN.
          SOLO CONTENIDO APROPIADO PARA TODOS LOS PÚBLICOS.
        `,
      n: 1,
      size: "512x512",
    });

    const imageUrl = imageResponse.data.data[0].url;
    console.log("URL de la imagen generada:", imageUrl);

    console.timeEnd("handleMotivationalImage");
    return { imageUrl, message: phrase };
  } catch (error) {
    console.timeEnd("handleMotivationalImage");
    console.error(
      "Error en handleMotivationalImage:",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports = { handleMotivationalImage };
