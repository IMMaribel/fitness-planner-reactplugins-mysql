import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiHome5Fill, RiMapPinFill, RiCalendarFill, RiBarChartFill } from 'react-icons/ri';
import { GiWeightLiftingUp } from 'react-icons/gi';

function Navbar() {
  const location = useLocation();

  const links = [
    { to: '/', icon: RiHome5Fill, text: 'Home' },
    { to: '/map', icon: RiMapPinFill, text: 'Map' },
    { to: '/calendar', icon: RiCalendarFill, text: 'Calendar' },
    { to: '/charts', icon: RiBarChartFill, text: 'Charts' },
  ];

  return (
    <nav className="bg-gray-800/50 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <Link to="/" className="flex items-center mr-8 group">
            <GiWeightLiftingUp className="w-8 h-8 text-blue-500 group-hover:text-blue-400 transition-colors duration-300" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              FitPlanner
            </span>
          </Link>
          
          <div className="flex space-x-2">
            {links.map(({ to, icon: Icon, text }) => (
              <Link
                key={to}
                to={to}
                className="group"
              >
                <div className="nav-link">
                  <Icon className="nav-icon" />
                  <span className="font-medium">{text}</span>
                  {location.pathname === to && (
                    <motion.div
                      layoutId="navunderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;