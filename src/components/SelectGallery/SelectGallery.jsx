import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import './SelectGallery.css';

const CATEGORIES = [
  { id: 'ambientadas', label: 'Obras Ambientadas' },
  { id: 'modulos', label: 'Módulos Digitais' },
  { id: 'pb', label: 'Fotografias P&B' },
  { id: 'cor', label: 'Fotografias em Cor' },
  { id: 'texturas', label: 'Superfícies e Texturas' },
];

function MagneticItem({ children, isActive, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Sensibilidade magnética (atrai 20px no máximo)
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY, position: 'relative' }}
      className={`select-item ${isActive ? 'active' : ''}`}
    >
      <span className="select-text" style={{ 
        color: isActive ? '#111111' : '#999999',
        fontWeight: isActive ? '500' : '400',
        transition: 'color 0.3s ease'
      }}>
        {children}
      </span>
      {isActive && (
        <motion.div 
          layoutId="activePill"
          className="absolute -bottom-2 left-0 right-0 h-[2px] bg-black"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.div>
  );
}

function SelectGallery({ activeTab, setActiveTab }) {
  return (
    <div style={{ 
      width: '100%', 
      backgroundColor: '#ffffff', 
      borderTop: '1px solid #E5E5E5', 
      borderBottom: '1px solid #E5E5E5' 
    }}>
      <div className="select-gallery-container py-10">
        {CATEGORIES.map((cat) => (
          <MagneticItem
            key={cat.id}
            isActive={activeTab === cat.id}
            onClick={() => setActiveTab(cat.id)}
          >
            {cat.label}
          </MagneticItem>
        ))}
      </div>
    </div>
  );
}

export default SelectGallery;
