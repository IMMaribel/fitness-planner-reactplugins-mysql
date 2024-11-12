import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ComingSoon from './ComingSoon';

function Charts() {
  const [showComingSoon, setShowComingSoon] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-white relative min-h-[600px]"
    >
      <h2 className="text-3xl font-bold mb-4">Charts</h2>
      <p>Track your progress...</p>
      
      <AnimatePresence>
        {showComingSoon && <ComingSoon />}
      </AnimatePresence>

      {/* Auto-hide coming soon message after 2 seconds */}
      {setTimeout(() => setShowComingSoon(false), 2000)}
    </motion.div>
  );
}

export default Charts;