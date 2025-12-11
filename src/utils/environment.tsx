const API_URL = PUBLIC_API_URL || "http://localhost:3001/api";

export const getApiEnvironment = () => {
  console.log("API URL:", API_URL);
  return API_URL;
};
