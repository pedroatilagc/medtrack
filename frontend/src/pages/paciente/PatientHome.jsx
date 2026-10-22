import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PageHeader from '../../components/ui/PageHeader';
import ConsultationFlow from '../../components/ConsultationFlow';

// "1987-04-12" → "12/04/1987" sem passar por Date, que pode deslocar um dia por causa do fuso
const formatDate = (iso) => iso?.split('-').reverse().join('/');

export default function PatientHome() {
  const { user } = useAuth();
  const firstName = user.nome.split(' ')[0];

  return (
    <>
      <PageHeader
        title={`Olá, ${firstName}`}
        description="Aqui você prepara suas consultas e acompanha as orientações depois delas."
        actions={
          <Link to="/paciente/consultas" className="btn btn-primary">
            Ver minhas consultas
          </Link>
        }
      />

      <div className="d-grid gap-5">
        <section className="panel" aria-labelledby="flow-title">
          <h2 id="flow-title" className="panel__title">
            Como cada consulta avança
          </h2>
          <ConsultationFlow />
        </section>

        <section className="panel" aria-labelledby="data-title">
          <h2 id="data-title" className="panel__title">
            Seus dados
          </h2>
          <dl className="data-sheet">
            <div>
              <dt>Nome</dt>
              <dd>{user.nome}</dd>
            </div>
            <div>
              <dt>E-mail</dt>
              <dd>{user.email}</dd>
            </div>
            <div>
              <dt>Data de nascimento</dt>
              <dd className="font-mono">{formatDate(user.data_nascimento) ?? 'Não informada'}</dd>
            </div>
          </dl>
        </section>
      </div>
    </>
  );
}
