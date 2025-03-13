import axios from "axios";

// Configuración de la baseURL dinámicamente según el entorno
const devURLs = [
  "http://localhost:5267/api", 
  "https://localhost:7247/api"
];

// Si la API base está definida en .env, se usa esa, de lo contrario, se selecciona una de las URLs de desarrollo.
const baseURL = import.meta.env.VITE_API_BASE_URL || devURLs[0];

if (!baseURL) {
  console.error("⚠️ VITE_API_BASE_URL no está definido en el archivo .env ni en la configuración por defecto.");
}

const api = axios.create({
  baseURL, // URL base de la API
  headers: {
    "Content-Type": "application/json",
  },
});

// Función para obtener todos los elementos de una entidad
export const fetchAll = async (entity) => {
  try {
    console.log(`📡 Fetching all from: ${baseURL}/${entity}`);
    const response = await api.get(`${entity.startsWith("/") ? entity : "/" + entity}`);
    console.log("✅ API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching ${entity}:`, error.response?.data || error.message);
    throw error;
  }
};

// Función para obtener un elemento por ID
export const fetchById = async (entity, id) => {
  try {
    console.log(`📡 Fetching ${entity} by ID: ${id}`);
    const response = await api.get(`/${entity}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching ${entity} by ID:`, error);
    throw error;
  }
};

// Función para crear un elemento
export const create = async (entity, data) => {
  try {
    console.log(`📡 Creating ${entity}`);
    const response = await api.post(`/${entity}`, data);
    return response.data;
  } catch (error) {
    console.error(`❌ Error creating ${entity}:`, error);
    throw error;
  }
};

// Función para actualizar un elemento
export const update = async (entity, id, data) => {
  try {
    console.log(`📡 Updating ${entity} with ID: ${id}`);
    const response = await api.put(`/${entity}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`❌ Error updating ${entity}:`, error);
    throw error;
  }
};

// Función para eliminar un elemento
export const remove = async (entity, id) => {
  try {
    console.log(`📡 Deleting ${entity} with ID: ${id}`);
    const response = await api.delete(`/${entity}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error deleting ${entity}:`, error);
    throw error;
  }
};
