import React from 'react';
import { motion } from 'framer-motion';
import { IoMapSharp } from 'react-icons/io5';
import { FaRunning, FaDumbbell, FaYoga } from 'react-icons/fa';

const Map = () => {
  const categories = [
    { icon: <FaDumbbell />, name: 'Gimnasios' },
    { icon: <FaRunning />, name: 'Parques' },
    { icon: <FaYoga />, name: 'Yoga' },
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
              <IoMapSharp className="w-8 h-8 text-indigo-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">
                Descubre Lugares para Entrenar
              </h1>
            </div>
            
            <div className="flex space-x-4 mb-6">
              {categories.map((category, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  <span className="text-xl mr-2">{category.icon}</span>
                  {category.name}
                </motion.button>
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
                <IoMapSharp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  El mapa se implementará en futuros sprints
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Map;