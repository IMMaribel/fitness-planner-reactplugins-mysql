import { motion } from 'framer-motion';
import { RiTimeLine } from 'react-icons/ri';

function ComingSoon() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800/95 backdrop-blur-sm p-6 rounded-xl shadow-xl text-center z-50"
    >
      <motion.div
        animate={{ 
          rotate: 360,
          transition: { duration: 2, repeat: Infinity, ease: "linear" }
        }}
        className="inline-block mb-4"
      >
        <RiTimeLine className="w-12 h-12 text-blue-400" />
      </motion.div>
      <h3 className="text-xl font-semibold text-white mb-2">Coming Soon!</h3>
      <p className="text-gray-300">This feature will be available in future updates</p>
    </motion.div>
  );
}

export default ComingSoon;