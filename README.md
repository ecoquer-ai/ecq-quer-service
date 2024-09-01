# Servicio de Backend para Asistencia Inteligente

Este servicio de backend está diseñado para integrar capacidades de procesamiento de lenguaje natural y visión por computadora, utilizando la API de OpenAI para clasificar y responder consultas a través de interfaces como chat y cámara.

## Características

- **Chat en tiempo real**: Gestiona y responde mensajes de chat utilizando modelos de inteligencia artificial para clasificación y respuesta.
- **Análisis de imágenes**: Procesa imágenes enviadas por los usuarios para análisis mediante modelos de visión por computadora.
- **Creación dinámica de asistentes**: Permite la creación de asistentes inteligentes que pueden manejar hilos de conversación específicos.
- **Seguridad**: Implementa autenticación básica para crear nuevos asistentes y enviar mensajes.

## Tecnologías Utilizadas

- **Node.js y Express**: Como entorno de ejecución del servidor y framework para construir la API.
- **Socket.io**: Para la gestión de comunicaciones en tiempo real a través de WebSockets.
- **OpenAI API**: Utilizada para interactuar con modelos de inteligencia artificial para análisis de texto e imagen.
- **Body-parser**: Middleware de Express para el procesamiento de JSON y datos codificados en URL.
- **HTTP**: Módulo de Node para crear servidor HTTP.

## Configuración y Ejecución

### Requisitos Previos

Asegúrate de tener Node.js instalado en tu máquina. Además, necesitarás claves API válidas de OpenAI configuradas en tu entorno.

### Instalación

1. Clona este repositorio en tu máquina local.
2. Navega al directorio del proyecto y ejecuta `npm install` para instalar las dependencias necesarias.

### Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
OPENAI_API_KEY=tu_clave_api_aquí
THREAD_ID=opcional_thread_id
ASSISTANT_ID=opcional_assistant_id
USER=tu_usuario
PASSWORD=tu_contraseña
PORT=3000

### Ejecución del Servidor

Ejecuta el servidor con el siguiente comando:

Este comando inicia el servidor en `localhost` en el puerto especificado (por defecto 3000).

## Endpoints

### POST /newAssistant
Crea un nuevo asistente y hilo de comunicación.
- **Body**: `{"user": "usuario", "password": "contraseña"}`

### POST /newMessage
Envía un nuevo mensaje al asistente.
- **Body**: `{"message": "tu_mensaje", "threadId": "tu_thread_id"}`

### POST /camera
Envía una imagen para análisis.
- **Body**: `{"base64Image": "tu_imagen_en_base64", "cameraType": "tipo_de_cámara"}`

## Contribuciones

Las contribuciones son bienvenidas. Si tienes mejoras o correcciones, siéntete libre de abrir un pull request o un issue.

## Licencia

Este proyecto está bajo la licencia MIT. Para más detalles, consulta el archivo `LICENSE`.

## Contacto

Si tienes alguna pregunta o necesitas soporte adicional, no dudes en contactar mediante la creación de un issue en este repositorio.
