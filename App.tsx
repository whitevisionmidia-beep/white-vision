import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import ClienteDetalhe from './pages/ClienteDetalhe';
import NovoCliente from './pages/NovoCliente';
import Contratos from './pages/Contratos';
import Propostas from './pages/Propostas';
import Financeiro from './pages/Financeiro';
import Tarefas from './pages/Tarefas';
import Comissoes from './pages/Comissoes';
import Locais from './pages/Locais';
import Login from './pages/Login';
import NotFound from './components/shared/NotFound';
import Integracoes from './pages/Integracoes';
import Configuracoes from './pages/Configuracoes';
import Usuarios from './pages/Usuarios';

const PrivateRoute: React.FC<{ children: React.ReactNode; roles?: string[] }> = ({ children, roles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-background"><p className="text-primary">Loading...</p></div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.level)) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="clientes/novo" element={<NovoCliente />} />
        <Route path="clientes/:id" element={<ClienteDetalhe />} />
        <Route path="contratos" element={<Contratos />} />
        <Route path="propostas" element={<Propostas />} />
        <Route path="financeiro" element={<Financeiro />} />
        <Route path="tarefas" element={<Tarefas />} />
        <Route path="comissoes" element={<Comissoes />} />
        <Route path="locais" element={<PrivateRoute roles={['Admin']}><Locais /></PrivateRoute>} />
        <Route path="usuarios" element={<PrivateRoute roles={['Admin']}><Usuarios /></PrivateRoute>} />
        <Route path="integracoes" element={<PrivateRoute roles={['Admin']}><Integracoes /></PrivateRoute>} />
        <Route path="configuracoes" element={<PrivateRoute roles={['Admin']}><Configuracoes /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;