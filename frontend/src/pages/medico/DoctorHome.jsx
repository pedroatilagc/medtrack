import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PageHeader from '../../components/ui/PageHeader';
import ConsultationFlow from '../../components/ConsultationFlow';

export default function DoctorHome() {
  const { user } = useAuth();
  const firstName = user.nome.split(' ')[0];

  return (
    <>
      <PageHeader
        title={`Olá, ${firstName}`}
        description="Veja sua agenda e os resumos que os pacientes preparam antes da consulta."
        actions={
          <Link to="/medico/agenda" className="btn btn-primary">
            Abrir agenda
          </Link>
        }
      />

      <div className="d-grid gap-5">
        <section className="panel" aria-labelledby="flow-title">
          <h2 id="flow-title" className="panel__title">
            Status das consultas na agenda
          </h2>
          <ConsultationFlow />
        </section>

        <section className="panel" aria-labelledby="data-title">
          <h2 id="data-title" className="panel__title">
            Dados profissionais
          </h2>
          <dl className="data-sheet">
            <div>
              <dt>Nome</dt>
              <dd>{user.nome}</dd>
            </div>
            <div>
              <dt>Especialidade</dt>
              <dd>{user.especialidade}</dd>
            </div>
            <div>
              <dt>CRM</dt>
              <dd className="font-mono">{user.crm}</dd>
            </div>
            <div>
              <dt>E-mail</dt>
              <dd>{user.email}</dd>
            </div>
          </dl>
        </section>
      </div>
    </>
  );
}
