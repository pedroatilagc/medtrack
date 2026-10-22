import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
});

let unauthorizedHandler = null;

export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = handler;
}

// TODO(auth): o formato de autenticação (cookie httpOnly ou token Bearer) ainda será definido
// com o back-end. Se for cookie: `withCredentials: true` na instância. Se for token: um
// interceptor de request aqui adiciona o header Authorization. Nada fora deste arquivo muda.

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      unauthorizedHandler?.();
    }
    // Normaliza para { message }, o mesmo formato que os mocks rejeitam
    const message =
      error.response?.data?.message ??
      (error.response ? 'Não foi possível concluir a ação.' : 'Sem conexão com o servidor.');
    return Promise.reject({ message, status: error.response?.status });
  },
);

export default api;
