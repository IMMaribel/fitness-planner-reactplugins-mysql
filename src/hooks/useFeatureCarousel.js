import { useState, useEffect } from 'react';
import { FaDumbbell, FaRunning, FaHeartbeat } from 'react-icons/fa';

export const useFeatureCarousel = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      Icon: FaDumbbell,
      title: "Strength Training",
      description: "Custom workout plans tailored to your goals",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
    },
    {
      Icon: FaRunning,
      title: "Cardio Workouts",
      description: "Track your running, cycling, and more",
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80"
    },
    {
      Icon: FaHeartbeat,
      title: "Health Monitoring",
      description: "Monitor your progress and vital stats",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return {
    currentFeature,
    setCurrentFeature,
    features,
    CurrentIcon: features[currentFeature].Icon
  };
};