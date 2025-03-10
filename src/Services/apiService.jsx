import axios from "axios";

// Configuración de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // URL base de la API
  headers: {
    "Content-Type": "application/json",
  },
});

// Función genérica para obtener todos los elementos de una entidad
export const fetchAll = async (entity) => {
  try {
    const response = await api.get(`/${entity}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${entity}:`, error);
    throw error;
  }
};

// Función genérica para obtener un elemento por ID
export const fetchById = async (entity, id) => {
  try {
    const response = await api.get(`/${entity}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${entity} by ID:`, error);
    throw error;
  }
};

// Función genérica para crear un elemento
export const create = async (entity, data) => {
  try {
    const response = await api.post(`/${entity}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error creating ${entity}:`, error);
    throw error;
  }
};

// Función genérica para actualizar un elemento
export const update = async (entity, id, data) => {
  try {
    const response = await api.put(`/${entity}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating ${entity}:`, error);
    throw error;
  }
};

// Función genérica para eliminar un elemento
export const remove = async (entity, id) => {
  try {
    const response = await api.delete(`/${entity}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting ${entity}:`, error);
    throw error;
  }
};