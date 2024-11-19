import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useFeatureCarousel } from '../hooks/useFeatureCarousel';

function Home() {
  const navigate = useNavigate();
  const { currentFeature, setCurrentFeature, features, CurrentIcon } = useFeatureCarousel();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Transform Your Fitness Journey
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your personal journey to a healthier lifestyle starts here. Track, plan, and achieve your fitness goals.
          </p>
        </motion.div>

        <div className="relative h-[500px] mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-xl h-full">
                <div className="relative h-3/5">
                  <img
                    src={features[currentFeature].image}
                    alt={features[currentFeature].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                </div>
                <div className="p-8">
                  <CurrentIcon className="w-12 h-12 text-blue-400 mb-4" />
                  <h3 className="text-2xl font-semibold mb-3 text-white">{features[currentFeature].title}</h3>
                  <p className="text-gray-300 text-lg">{features[currentFeature].description}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFeature(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentFeature ? 'bg-blue-500 w-6' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center"
        >
          <button
            onClick={() => navigate('/workouts')}
            className="ml-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:bg-blue-400 text-white p-2 rounded-none transition-transform duration-500 hover:scale-110"
          >
            Start Your Journey
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Home;