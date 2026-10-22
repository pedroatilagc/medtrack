import { usuarios, pacientes, medicos } from './db';

const SESSION_KEY = 'medtrack.mockSession';

const delay = () => new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 300));

// Junta USUARIO com a tabela do perfil e remove a senha: é o formato que a API deve devolver.
function toPublicUser(usuario) {
  const { senha: _senha, ...base } = usuario;
  const profileTable = base.tipo_usuario === 'medico' ? medicos : pacientes;
  const { id_usuario: _id, ...profile } =
    profileTable.find((row) => row.id_usuario === base.id_usuario) ?? {};
  return { ...base, ...profile };
}

function readSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export async function login(email, senha) {
  await delay();
  const usuario = usuarios.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.senha === senha,
  );
  if (!usuario) {
    throw { message: 'E-mail ou senha incorretos. Confira os dados e tente de novo.' };
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id_usuario: usuario.id_usuario }));
  return toPublicUser(usuario);
}

export async function logout() {
  await delay();
  localStorage.removeItem(SESSION_KEY);
}

export async function getCurrentUser() {
  await delay();
  const session = readSession();
  const usuario = session && usuarios.find((u) => u.id_usuario === session.id_usuario);
  return usuario ? toPublicUser(usuario) : null;
}

// No mock não há 401; mantém a mesma interface do adaptador da API.
export function onUnauthorized() {}
