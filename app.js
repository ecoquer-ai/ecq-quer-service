const { openAi } = require("./utils/instances");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const express = require("express");
const http = require("http");
require("dotenv").config();
const {
  userAssistantContentExercise,
  userAssistantContentNutrition,
} = require("./utils/static");
const {
  handleNewMessage,
  handleVisionExperts,
  handleCreateAssistant,
  handleClassifyQuestion,
  handleNutritionistExpert,
  handleNutritionistExpertLvl2,
} = require("./handlers");
const {
  handleMotivationalImage,
} = require("./handlers/spirituality/handleMotivationalImage");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
console.log("Express y Socket.io configurados");

// Variables de entorno
let threadId = process.env.THREAD_ID;
let assistantId = process.env.ASSISTANT_ID;
console.log("Variables de entorno cargadas");

// Configuración de middlewares
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

console.log("Middlewares configurados");

// Gestión de conexiones Socket.io
io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado a Socket.io");

  let response;
  let assistantRes;
  let expertRes;

  socket.on("chat", async ({ message }) => {
    console.time("chat");
    console.log("Mensaje recibido del cliente:", message);

    try {
      const classifierRes = await handleClassifyQuestion(message);
      console.log("classifierRes completo:", classifierRes);

      if (classifierRes.error) {
        throw new Error(classifierRes.error);
      }

      let detailedMessage = `Mensaje original del usuario: ${message}\n\n`;

      if (classifierRes.category === "handleNutritionEntry") {
        console.log(
          "Entrando al bloque actions: classifierRes.category",
          classifierRes.category
        );

        const expertRes = await handleNutritionistExpert(message);
        if (expertRes.error) {
          throw new Error(expertRes.error);
        }

        if (expertRes.data && expertRes.data.length > 0) {
          const foodDescriptions = expertRes.data
            .map(
              (food) =>
                `${food.description} - porción ${food.portionSize.value}${food.portionSize.unit}, ${food.calories} calorías, ${food.proteins}g proteínas, ${food.carbs}g carbohidratos, ${food.fats}g grasas, ${food.fiber}g fibra, ${food.water}g agua.`
            )
            .join("\n");

          detailedMessage += `Función que debes invocar: ${classifierRes.category}.\nRespuesta del experto en nutrición:\nDescripción: ${expertRes.foodsDescriptions}.\nAlimentos:\n${foodDescriptions}`;
        } else {
          detailedMessage += `El mensaje fue analizado por un modelo experto en nutrición, pero no se detectó la necesidad de ejecutar ninguna funcionalidad extra.`;
        }

        const expertLvl2Res = await handleNutritionistExpertLvl2(
          detailedMessage
        );
        if (expertLvl2Res.error) {
          throw new Error(expertLvl2Res.error);
        }

        if (expertLvl2Res.data && expertLvl2Res.data.length > 0) {
          detailedMessage += `\n\nDatos mejorados por el experto nivel 2:\n${JSON.stringify(
            expertLvl2Res
          )}`;
        } else {
          detailedMessage += `\n\nEl experto nivel 2 no identificó cambios significativos o no pudo analizar el mensaje.`;
        }
      } else {
        console.log(
          "No es necesario procesar este mensaje en el flujo de nutrición."
        );
        detailedMessage += `El mensaje no fue clasificado como una consulta de nutrición.`;
      }

      console.log(
        "Mensaje final para enviar a handleNewMessage:",
        detailedMessage
      );

      const response = await handleNewMessage(
        threadId,
        assistantId,
        detailedMessage
      );
      if (response.error) {
        throw new Error(response.error);
      }

      socket.emit("chat", {
        message: response.messages.data[0].content[0].text.value,
        components: response.components,
        timestamp: Date.now(),
      });
      console.log("Respuesta del LLM enviada al cliente", {
        message: response.messages.data[0].content[0].text.value,
        components: response.components,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.log(
        "Error comunicándose con LLM:",
        error.message || error.response
      );
    }
    console.timeEnd("chat");
  });

  socket.on("camera", async ({ base64Image }) => {
    console.time("socket.on camera");
    console.log("Datos de cámara recibidos del cliente base64Image", {
      base64Image: base64Image.slice(0, 30),
    });

    try {
      // Enviar mensaje al LLM y obtener respuesta
      response = await handleVisionExperts(base64Image);
      console.log("handleVisionExperts, response", response);

      // const cameraTypes = {
      //   // exercise: {
      //   //   message: userAssistantContentExercise(response),
      //   // },
      //   nutrition: {
      //     message: userAssistantContentNutrition(response),
      //   },
      // };

      // message = cameraTypes[cameraType].message;
      // console.log("message", message);
      // esto activa el flujo con el agente de openai que llama a las apis
      // assistantRes = await handleNewMessage(threadId, assistantId, message);
      // console.log("Respuesta recibida del LLM VISION", assistantRes);
      socket.emit(
        "camera",
        // message: assistantRes.messages.data[0].content[0].text.value,
        response.ImageAnalysisResponse
        // components: [],
      );

      // console.log("Respuesta del LLM enviada al cliente", {
      //   // message: assistantRes.messages.data[0].content[0].text.value,
      //   message: response,
      //   // components: assistantRes.components,
      //   timestamp: Date.now(),
      // });
    } catch (error) {
      console.log(
        "Error comunicándose con LLM:",
        error?.response?.data?.error
          ? error.response?.data?.error
          : error.response?.data
          ? error.response.data
          : error
      );
    }
    console.timeEnd("socket.on camera");
  });

  socket.on("generateMotivationalImage", async () => {
    try {
      const { imageUrl, message } = await handleMotivationalImage();
      socket.emit("generateMotivationalImage", {
        imageUrl,
        message,
      });
      console.log(
        "URL de imagen generada enviada al cliente:",
        imageUrl,
        message
      );
    } catch (error) {
      console.log("generateMotivationalImage error", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado de Socket.io");
  });
});

// Endpoint para crear un nuevo asistente
app.post("/newAssistant", async (req, res) => {
  console.log("Solicitud recibida para crear un nuevo asistente e hilo");
  const { user, password } = req.body;

  console.log(user, password);
  console.log(process.env.USER, process.env.PASSWORD);
  let threadId;
  let assistantId;

  if (!user || !password) {
    console.log("/newAssistant Error: Faltan campos requeridos");
    return res.status(400).json({ error: "Faltan campos requeridos." });
  }

  if (user !== process.env.USER || password !== process.env.PASSWORD) {
    console.log("/newAssistant Error: Autenticación fallida");
    return res.status(403).json({ error: "Autenticación fallida." });
  }

  try {
    const resThreads = await openAi.post("/threads", {
      messages: [],
    });

    threadId = resThreads.data.id;
    console.log(
      `/newAssistant: New thread created with ID: ${resThreads.data.id}`
    );

    assistantId = await handleCreateAssistant(threadId);
    console.log(`/newAssistant: Nuevo asistente creado`, {
      assistantId,
      threadId,
    });

    res.json({ assistantId, threadId });
  } catch (error) {
    console.error("/newAssistant: Error creando asistente:", error.response);
    res
      .status(500)
      .send("/newAssistant: Error creando asistente", error.response);
  }
});

// Endpoint para enviar un nuevo mensaje
app.post("/newMessage", async (req, res) => {
  console.time("/newMessage");
  const { message, threadId } = req.body;

  console.log("message", message);

  try {
    const assistantRes = await handleNewMessage(threadId, assistantId, message);
    res.status(200).json(assistantRes);
  } catch (error) {
    res.status(500).send({
      message: "/newMessage: Error en el chat",
      error,
    });
  }
  console.timeEnd("/newMessage");
});

// Endpoint para enviar imagen a asistente experto en clasificar imagenes. FALTA IMPLEMENTAR
app.post("/camera", async (req, res) => {
  const { threadId, base64Image, cameraType } = req.body;

  let visionRes;
  let message = "";

  // modo asistente experto en clasificar imagenes de elementos de calistenia y recomendar rutinas
  visionRes = await handleVisionExperts(base64Image, cameraType);
  console.log("/newMessage, visionRes", visionRes);

  const cameraTypes = {
    exercise: {
      message: userAssistantContentExercise(visionRes),
    },
    nutrition: {
      message: userAssistantContentNutrition(visionRes),
    },
  };

  message = cameraTypes[cameraType].message;

  const assistantRes = await handleNewMessage(threadId, assistantId, message);
  res.status(200).json(assistantRes);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`Servidor ejecutándose en el puerto ${PORT}`)
);
