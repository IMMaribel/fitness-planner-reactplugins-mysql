import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RiHome5Fill, RiMapPinFill, RiCalendarFill, RiBarChartFill } from 'react-icons/ri';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { FaDumbbell, FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: '/', icon: RiHome5Fill, text: 'Home' },
    { to: '/map', icon: RiMapPinFill, text: 'Map' },
    { to: '/calendar', icon: RiCalendarFill, text: 'Calendar' },
    { to: '/charts', icon: RiBarChartFill, text: 'Charts' },
    { to: '/workouts', icon: FaDumbbell, text: 'Workouts' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <nav className="bg-gray-800/50 backdrop-blur-lg border-b border-white/10 relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center group">
            <GiWeightLiftingUp className="w-8 h-8 text-blue-500 group-hover:text-blue-400 transition-colors duration-300" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              FitPlanner
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2">
            {links.map(({ to, icon: Icon, text }) => (
              <Link
                key={to}
                to={to}
                className="group"
                onClick={() => setIsOpen(false)}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none"
          >
            {isOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden overflow-hidden bg-gray-800/95 backdrop-blur-lg absolute left-0 right-0 border-b border-white/10"
            >
              <motion.div className="px-4 py-2 space-y-1">
                {links.map(({ to, icon: Icon, text }) => (
                  <motion.div
                    key={to}
                    variants={itemVariants}
                    className="w-full"
                  >
                    <Link
                      to={to}
                      className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{text}</span>
                      {location.pathname === to && (
                        <motion.div
                          layoutId="mobileunderline"
                          className="absolute left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;