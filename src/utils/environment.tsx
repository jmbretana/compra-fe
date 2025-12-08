export const API_SERVER_LOCAL = "http://localhost:3001/api"; // Acción para iniciar una solicitud
export const API_SERVER_PROD =
  "https://appsalve-api.netlify.app/.netlify/functions/api"; // Acción para el éxito al obtener todas las solicitudes

export const getApiEnvironment = () => {
  let apiURLServer = "http://localhost:3001/api";

  if (window.location.hostname !== "localhost") {
    apiURLServer = "https://appsalve-api.netlify.app/.netlify/functions/api";
  }

  return apiURLServer;
};
