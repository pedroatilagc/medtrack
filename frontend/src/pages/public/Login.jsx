// TEMPORÁRIO – substituído no Prompt 02 (tela de login definitiva, com validação completa)
import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { Stethoscope, UserRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { demoCredentials } from '../../services/authService';
import { homeFor } from '../../routes/paths';
import LoadingState from '../../components/ui/LoadingState';

export default function Login() {
  const { login, isAuthenticated, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Entrar · MedTrack';
  }, []);

  if (loading) return <LoadingState label="Verificando sua sessão" />;
  if (isAuthenticated && !submitting) return <Navigate to={homeFor(user)} replace />;

  async function signIn(credentials) {
    setError('');
    setSubmitting(true);
    try {
      const loggedUser = await login(credentials.email, credentials.senha);
      const home = homeFor(loggedUser);
      // Volta para a página que pediu login, desde que pertença ao perfil de quem entrou
      const from = location.state?.from;
      navigate(from?.startsWith(home) ? from : home, { replace: true });
    } catch (err) {
      setError(err.message ?? 'Não foi possível entrar agora. Tente de novo em instantes.');
      setSubmitting(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim() || !senha) {
      setError('Informe o e-mail e a senha para entrar.');
      return;
    }
    signIn({ email, senha });
  }

  const errorProps = error ? { 'aria-describedby': 'login-error', 'aria-invalid': true } : {};

  return (
    <div className="login-grid">
      <section aria-labelledby="login-title">
        <h1 id="login-title">Entrar</h1>
        <p className="text-body-secondary mb-5">Use o e-mail e a senha da sua conta.</p>

        {error && (
          <Alert variant="danger" role="alert" id="login-error">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-4" controlId="login-email">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              {...errorProps}
            />
          </Form.Group>
          <Form.Group className="mb-5" controlId="login-senha">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              autoComplete="current-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              {...errorProps}
            />
          </Form.Group>
          <Button type="submit" variant="primary" disabled={submitting} className="w-100">
            {submitting && <Spinner size="sm" aria-hidden="true" />}
            {submitting ? 'Entrando…' : 'Entrar'}
          </Button>
        </Form>

        <div className="demo-access">
          <h2 className="h4 mb-1">Acesso de demonstração</h2>
          <p className="text-body-secondary small mb-3">
            Entre com uma conta fictícia para conhecer cada perfil.
          </p>
          <div className="d-flex flex-wrap gap-2">
            <Button
              variant="outline-primary"
              disabled={submitting}
              onClick={() => signIn(demoCredentials.paciente)}
            >
              <UserRound size={18} aria-hidden="true" />
              Entrar como paciente demo
            </Button>
            <Button
              variant="outline-primary"
              disabled={submitting}
              onClick={() => signIn(demoCredentials.medico)}
            >
              <Stethoscope size={18} aria-hidden="true" />
              Entrar como médico demo
            </Button>
          </div>
        </div>
      </section>

      <aside className="login-aside" aria-labelledby="about-title">
        <h2 id="about-title" className="mb-3">
          Sua consulta, organizada antes e depois
        </h2>
        <p className="text-body-secondary mb-5">
          O MedTrack reúne o que você quer contar ao médico e guarda as orientações que recebeu. Ele organiza
          informações: não faz diagnósticos nem substitui a avaliação médica.
        </p>
        <ol className="steps">
          <li className="steps__item">
            <span className="steps__title">Antes</span>
            <p className="steps__text">Você anota motivo, sintomas, dúvidas e medicamentos em uso.</p>
          </li>
          <li className="steps__item">
            <span className="steps__title">Na consulta</span>
            <p className="steps__text">O médico recebe um resumo organizado do que você registrou.</p>
          </li>
          <li className="steps__item">
            <span className="steps__title">Depois</span>
            <p className="steps__text">Orientações, medicamentos e data de retorno ficam num só lugar.</p>
          </li>
        </ol>
      </aside>
    </div>
  );
}
