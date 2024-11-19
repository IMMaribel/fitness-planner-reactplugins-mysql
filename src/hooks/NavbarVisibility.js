// src/hooks/NavbarVisibility.js
import { useEffect, useState } from 'react';

function useNavbarVisibility() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let previousScrollPosition = window.scrollY;

    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      if (currentScrollPosition > previousScrollPosition) {
        // Si se desplaza hacia abajo, ocultar la barra de navegación
        setIsVisible(false);
      } else {
        // Si se desplaza hacia arriba, mostrar la barra de navegación
        setIsVisible(true);
      }
      previousScrollPosition = currentScrollPosition;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isVisible;
}

export default useNavbarVisibility;
