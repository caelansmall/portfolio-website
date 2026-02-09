"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const BoxesCore = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ rows: 150, cols: 150 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Hide on mobile/small screens
      if (width < 768) {
        setIsMobile(true);
        return;
      }

      setIsMobile(false);

      // Calculate grid based on viewport - VERY aggressive coverage
      const boxSize = 64;
      const scaleFactor = 0.675;
      const effectiveBoxSize = boxSize * scaleFactor;

      // Massive multiplier - the 48deg skew spreads things out A LOT
      const cols = Math.ceil((width * 4.5) / effectiveBoxSize);
      const rows = Math.ceil((height * 4.5) / effectiveBoxSize);

      setDimensions({ 
        rows: Math.max(150, Math.min(rows, 250)), // Minimum 150, max 250
        cols: Math.max(150, Math.min(cols, 250))
      });
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  const colors = [
    "#93c5fd",
    "#f9a8d4",
    "#86efac",
    "#fde047",
    "#fca5a5",
    "#d8b4fe",
    "#a5b4fc",
    "#c4b5fd",
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (!mounted || isMobile) {
    return null;
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div
        style={{
          transform: `translate(-50%,-50%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
        }}
        className="absolute left-1/2 top-1/2 flex"
      >
        {Array.from({ length: dimensions.rows }).map((_, i) => (
          <div key={`row-${i}`} className="flex flex-col">
            {Array.from({ length: dimensions.cols }).map((_, j) => (
              <motion.div
                whileHover={{
                  backgroundColor: getRandomColor(),
                  transition: { duration: 0 },
                }}
                whileTap={{
                  scale: 1.4,
                  boxShadow: `0 0 64px 24px ${getRandomColor()}ee`,
                  backgroundColor: getRandomColor(),
                  transition: { duration: 0.32 },
                }}
                key={`col-${j}`}
                className="w-16 h-16 border border-slate-700"
              >
                {j % 2 === 0 && i % 2 === 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px] text-slate-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                ) : null}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);