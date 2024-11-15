import React from 'react';
import { motion } from 'framer-motion';
import { BsCalendarWeekFill } from 'react-icons/bs';
import { FaRunning, FaSwimmer, FaBiking, FaYoga } from 'react-icons/fa';

const Calendar = () => {
  const activities = [
    { icon: <FaRunning />, name: 'Running', color: 'bg-green-500' },
    { icon: <FaSwimmer />, name: 'Natación', color: 'bg-blue-500' },
    { icon: <FaBiking />, name: 'Ciclismo', color: 'bg-orange-500' },
    { icon: <FaYoga />, name: 'Yoga', color: 'bg-purple-500' },
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
              <BsCalendarWeekFill className="w-8 h-8 text-indigo-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">
                Planifica tus Actividades
              </h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`${activity.color} p-4 rounded-lg text-white flex items-center justify-center flex-col cursor-pointer`}
                >
                  <span className="text-2xl mb-2">{activity.icon}</span>
                  <span className="font-medium">{activity.name}</span>
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
                <BsCalendarWeekFill className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                The schedule will be implemented in future
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Calendar;