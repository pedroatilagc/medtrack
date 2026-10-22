import { Outlet } from 'react-router-dom';
import Brand from './Brand';

export default function PublicLayout() {
  return (
    <div className="public-shell">
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <header className="public-shell__header">
        <Brand />
      </header>
      <main id="conteudo" tabIndex={-1} className="public-shell__main">
        <Outlet />
      </main>
    </div>
  );
}
