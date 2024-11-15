import React from 'react';
import { motion } from 'framer-motion';
import { BiSolidChart } from 'react-icons/bi';
import { FaHeartbeat, FaFireAlt, FaClock, FaTrophy } from 'react-icons/fa';

const Charts = () => {
  const stats = [
    { icon: <FaHeartbeat />, name: 'Ritmo Cardíaco', value: '72 bpm', color: 'bg-red-500' },
    { icon: <FaFireAlt />, name: 'Calorías', value: '2,456 kcal', color: 'bg-orange-500' },
    { icon: <FaClock />, name: 'Tiempo Activo', value: '5.2 hrs', color: 'bg-blue-500' },
    { icon: <FaTrophy />, name: 'Objetivos', value: '8/10', color: 'bg-green-500' },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center mb-6">
              <BiSolidChart className="w-8 h-8 text-indigo-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">
                Estadísticas y Progreso
              </h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`${stat.color} p-6 rounded-lg text-white`}
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.name}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative h-[600px] bg-gray-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <BiSolidChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                Charts will be implemented in future
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Charts;