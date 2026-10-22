// Ponto único de autenticação para telas e contextos. Escolhe a implementação (mock ou API)
// uma vez, e as duas têm a mesma interface: trocar o mock pela API não muda nenhuma tela.
import api, { setUnauthorizedHandler } from './api';
import * as authMock from './mock/authMock';
import { DEMO_CREDENTIALS } from './mock/db';

// Endpoints provisórios: confirmar com o back-end quando o contrato da API sair.
const authApi = {
  async login(email, senha) {
    const { data } = await api.post('/auth/login', { email, senha });
    return data.usuario;
  },
  async logout() {
    await api.post('/auth/logout');
  },
  async getCurrentUser() {
    try {
      const { data } = await api.get('/auth/me');
      return data.usuario;
    } catch (error) {
      if (error.status === 401) return null;
      throw error;
    }
  },
  onUnauthorized: setUnauthorizedHandler,
};

const useMock = import.meta.env.VITE_USE_MOCK === 'true';
const impl = useMock ? authMock : authApi;

export const login = (email, senha) => impl.login(email, senha);
export const logout = () => impl.logout();
export const getCurrentUser = () => impl.getCurrentUser();
export const onUnauthorized = (handler) => impl.onUnauthorized(handler);

// TEMPORÁRIO – substituído no Prompt 02. Atalhos de login demo; com a API real,
// só funcionam se o back-end tiver esses usuários de seed.
export const demoCredentials = DEMO_CREDENTIALS;
