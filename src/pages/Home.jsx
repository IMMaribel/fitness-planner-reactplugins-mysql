import React from 'react';
import { motion } from 'framer-motion';
import { FaDumbbell, FaHeartbeat, FaStopwatch } from 'react-icons/fa';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { IoMdTrophy } from 'react-icons/io';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-indigo-50 via-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Tu Camino al Éxito Fitness
          </h1>
          <p className="text-xl text-gray-600">
            Transforma tu vida con un plan personalizado y seguimiento profesional
          </p>
        </motion.div>

        <div className="relative mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl overflow-hidden shadow-2xl aspect-video"
          >
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="Fitness Training"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/50 to-purple-600/50 flex items-center justify-center">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white text-center"
              >
                <GiWeightLiftingUp className="w-16 h-16 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Comienza Tu Viaje</h2>
                <p className="text-lg">Entrena, Progresa, Alcanza</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-3 gap-8 mt-12"
        >
          <motion.div variants={item} className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mb-6">
              <FaDumbbell className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Entrena Inteligente</h3>
            <p className="text-gray-600">
              Rutinas personalizadas que se adaptan a tu nivel y objetivos específicos
            </p>
          </motion.div>

          <motion.div variants={item} className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mb-6">
              <FaHeartbeat className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Monitoreo en Vivo</h3>
            <p className="text-gray-600">
              Seguimiento en tiempo real de tu frecuencia cardíaca y zonas de entrenamiento
            </p>
          </motion.div>

          <motion.div variants={item} className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mb-6">
              <IoMdTrophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Logros y Recompensas</h3>
            <p className="text-gray-600">
              Sistema de logros que te mantiene motivado y celebra tu progreso
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;