import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ComingSoon from './ComingSoon';

function Calendar() {
  const [showComingSoon, setShowComingSoon] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-white relative min-h-[600px]"
    >
      <h2 className="text-3xl font-bold mb-4">Calendar</h2>
      <p>Plan your fitness schedule...</p>
      
      <AnimatePresence>
        {showComingSoon && <ComingSoon />}
      </AnimatePresence>

      {setTimeout(() => setShowComingSoon(false), 5000)}
    </motion.div>
  );
}

export default Calendar;