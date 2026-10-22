export const ROLE_HOME = {
  paciente: '/paciente',
  medico: '/medico',
};

export const homeFor = (user) => ROLE_HOME[user?.tipo_usuario] ?? '/login';
