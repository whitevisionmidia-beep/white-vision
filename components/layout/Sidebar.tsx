import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  FileSignature, 
  DollarSign, 
  ListTodo, 
  Award, 
  MapPin,
  Zap,
  Settings,
  Plug,
  UserCog
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.level === 'Admin';

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, text: 'Dashboard', roles: ['Admin', 'Vendedor'] },
    { to: '/clientes', icon: Users, text: 'Clientes', roles: ['Admin', 'Vendedor'] },
    { to: '/contratos', icon: FileText, text: 'Contratos', roles: ['Admin', 'Vendedor'] },
    { to: '/propostas', icon: FileSignature, text: 'Propostas', roles: ['Admin', 'Vendedor'] },
    { to: '/financeiro', icon: DollarSign, text: 'Financeiro', roles: ['Admin', 'Vendedor'] },
    { to: '/tarefas', icon: ListTodo, text: 'Tarefas', roles: ['Admin', 'Vendedor'] },
    { to: '/comissoes', icon: Award, text: 'Comissões', roles: ['Admin', 'Vendedor'] },
    { to: '/locais', icon: MapPin, text: 'Locais', roles: ['Admin'] },
  ];

  const adminNavItems = [
     { to: '/usuarios', icon: UserCog, text: 'Usuários', roles: ['Admin'] },
     { to: '/integracoes', icon: Plug, text: 'Integrações', roles: ['Admin'] },
     { to: '/configuracoes', icon: Settings, text: 'Configurações', roles: ['Admin'] },
  ];

  const NavItem: React.FC<{ to: string, icon: React.ElementType, text: string }> = ({ to, icon: Icon, text }) => (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
            isActive
              ? 'bg-secondary text-white'
              : 'text-subtle hover:bg-surface hover:text-text'
          }`
        }
      >
        <Icon className="w-5 h-5 mr-3" />
        <span className="font-medium">{text}</span>
      </NavLink>
    </li>
  );
  
  return (
    <aside className="w-64 bg-surface border-r border-border flex-shrink-0 p-4 flex flex-col">
      <Link to="/dashboard" className="flex items-center p-2 mb-6">
        <Zap className="w-8 h-8 text-primary" />
        <h1 className="text-xl font-bold ml-2 text-text">Visão Branca</h1>
      </Link>
      <nav className="flex-1">
        <p className="px-3 text-xs font-semibold text-subtle uppercase tracking-wider">Menu</p>
        <ul>
          {navItems.map(item =>
            item.roles.includes(user?.level || '') ? (
              <NavItem key={item.to} to={item.to} icon={item.icon} text={item.text} />
            ) : null
          )}
        </ul>
        {isAdmin && (
            <div className="mt-6">
                 <p className="px-3 text-xs font-semibold text-subtle uppercase tracking-wider">Admin</p>
                <ul>
                    {adminNavItems.map(item => <NavItem key={item.to} to={item.to} icon={item.icon} text={item.text} />)}
                </ul>
            </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;