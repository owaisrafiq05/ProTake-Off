import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Button } from './ui/button';

const navLinks = [
  { to: '/admin', label: 'Dashboard' }
];

const AdminHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    Cookies.remove('adminToken');
    navigate('/admin-login');
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center space-x-6">
          <Link to="/admin" className="text-xl font-bold text-green-700">Admin Panel</Link>
          <nav className="flex space-x-4">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium px-3 py-2 rounded transition-colors ${location.search === link.to.split('?')[1] ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-medium">Logout</Button>
      </div>
    </header>
  );
};

export default AdminHeader; 