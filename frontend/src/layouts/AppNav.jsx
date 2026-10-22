import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { CalendarDays, ClipboardList, House, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_BY_ROLE = {
  paciente: [
    { to: '/paciente', label: 'Início', icon: House, end: true },
    { to: '/paciente/consultas', label: 'Minhas consultas', icon: ClipboardList },
  ],
  medico: [
    { to: '/medico', label: 'Início', icon: House, end: true },
    { to: '/medico/agenda', label: 'Agenda', icon: CalendarDays },
  ],
};

export function NavLinks({ onNavigate }) {
  const { user } = useAuth();
  const items = NAV_BY_ROLE[user?.tipo_usuario] ?? [];

  return (
    <ul className="app-nav">
      {items.map(({ to, label, icon: Icon, end }) => (
        <li key={to}>
          {/* NavLink aplica .active e aria-current="page" no link da rota atual */}
          <NavLink to={to} end={end} className="app-nav__link" onClick={onNavigate}>
            <Icon size={18} aria-hidden="true" />
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export function UserBlock() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="user-block">
      <div>
        <div className="user-block__name">{user.nome}</div>
        <div className="user-block__meta">
          {user.tipo_usuario === 'medico' ? (
            <>
              {user.especialidade} · <span className="font-mono">{user.crm}</span>
            </>
          ) : (
            'Paciente'
          )}
        </div>
      </div>
      <Button variant="outline-secondary" size="sm" onClick={handleLogout} className="align-self-start">
        <LogOut size={16} aria-hidden="true" />
        Sair
      </Button>
    </div>
  );
}
