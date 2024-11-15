import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ComingSoon from './ComingSoon';

function Map() {
  const [showComingSoon, setShowComingSoon] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-white relative min-h-[600px]"
    >
      <h2 className="text-3xl font-bold mb-4">Map</h2>
      <p>Explore nearby fitness locations...</p>
      
      <AnimatePresence>
        {showComingSoon && <ComingSoon />}
      </AnimatePresence>

      {setTimeout(() => setShowComingSoon(false), 5000)}
    </motion.div>
  );
}

export default Map;