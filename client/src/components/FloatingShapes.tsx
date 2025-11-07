import { motion } from "framer-motion";

export function FloatingShapes() {
  const shapes = [
    { size: 300, top: "10%", left: "10%", duration: 20, delay: 0 },
    { size: 200, top: "60%", left: "80%", duration: 25, delay: 2 },
    { size: 250, top: "80%", left: "20%", duration: 22, delay: 4 },
    { size: 180, top: "30%", left: "70%", duration: 18, delay: 1 },
    { size: 220, top: "50%", left: "50%", duration: 24, delay: 3 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
            background: `radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 100%)`,
            filter: "blur(40px)",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`cube-${i}`}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            rotate: [0, 360],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className="relative"
            style={{
              width: 40 + i * 10,
              height: 40 + i * 10,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="absolute inset-0 border border-primary/20 rounded-lg"
              style={{
                transform: "rotateY(45deg) rotateX(45deg)",
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
