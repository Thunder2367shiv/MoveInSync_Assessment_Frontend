import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link, Outlet } from 'react-router-dom';
import { FaLeaf, FaChartPie, FaCogs, FaSignOutAlt, FaBolt, FaAd, FaAddressCard } from 'react-icons/fa';

const Layout = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl tracking-wide">
            <img
            src="/logonew.png"
            alt="logo"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "10px" 
            }}
          />

            <span>MoveInSync</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link to="/dashboard" className="flex items-center gap-2 hover:text-green-200 transition">
              <FaChartPie /> Dashboard
            </Link>

            <Link to="/simulator" className="hover:text-yellow-300 flex items-center gap-2 text-gray-300">
          <FaBolt /> Simulator
        </Link>

            {user?.role === 'admin' && (
              <Link to="/admin" className="flex items-center gap-2 hover:text-green-200 transition">
                <FaCogs /> Config
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/ruleImpact" className="flex items-center gap-2 hover:text-green-200 transition">
                <FaAddressCard /> RuleImpact
              </Link>
            )}

            <div className="h-6 w-[1px] bg-green-500 mx-2"></div>
            
            <div className="flex flex-col items-end leading-tight mr-2">
              <span className="text-xs text-green-200 uppercase font-bold">{user?.role}</span>
              <span className="text-xs">{user?.name}</span>
            </div>

            <button onClick={logout} className="text-red-200 hover:text-white transition text-lg">
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;