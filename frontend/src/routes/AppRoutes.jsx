import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import { homeFor } from './paths';
import PublicLayout from '../layouts/PublicLayout';
import AppLayout from '../layouts/AppLayout';
import LoadingState from '../components/ui/LoadingState';
import Login from '../pages/public/Login';
import NotFound from '../pages/public/NotFound';
import PatientHome from '../pages/paciente/PatientHome';
import PatientAppointments from '../pages/paciente/PatientAppointments';
import DoctorHome from '../pages/medico/DoctorHome';
import DoctorSchedule from '../pages/medico/DoctorSchedule';

function RootRedirect() {
  const { user, loading } = useAuth();
  if (loading) return <LoadingState label="Verificando sua sessão" fullPage />;
  return <Navigate to={homeFor(user)} replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['paciente']} />}>
        <Route path="/paciente" element={<AppLayout />}>
          <Route index element={<PatientHome />} />
          <Route path="consultas" element={<PatientAppointments />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['medico']} />}>
        <Route path="/medico" element={<AppLayout />}>
          <Route index element={<DoctorHome />} />
          <Route path="agenda" element={<DoctorSchedule />} />
        </Route>
      </Route>

      <Route element={<PublicLayout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
