import { useEffect, useRef } from "react";
import gsap from "gsap";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let orbs: FloatingOrb[] = [];
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Track mouse for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Premium floating orb class with GSAP animations
    class FloatingOrb {
      x: number;
      y: number;
      size: number;
      color: string;
      opacity: number;
      angle: number;
      speed: number;

      constructor() {
        const width = canvas?.width || window.innerWidth;
        const height = canvas?.height || window.innerHeight;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 150 + 100;
        this.opacity = 0;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.3 + 0.1;
        
        const colors = [
          "147, 51, 234",   // Purple
          "168, 85, 247",   // Light purple
          "59, 130, 246",   // Blue
          "139, 92, 246",   // Violet
          "236, 72, 153",   // Pink
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];

        // Animate orb entrance with GSAP
        gsap.to(this, {
          opacity: Math.random() * 0.15 + 0.05,
          duration: Math.random() * 3 + 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });

        // Animate size pulsing
        gsap.to(this, {
          size: this.size * 1.3,
          duration: Math.random() * 4 + 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      }

      update() {
        if (!canvas) return;
        
        // Smooth floating motion
        this.angle += this.speed * 0.01;
        this.x += Math.cos(this.angle) * 0.5;
        this.y += Math.sin(this.angle) * 0.3;

        // Wrap around screen
        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
      }

      draw() {
        if (!ctx) return;
        
        // Create radial gradient for premium glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, `rgba(${this.color}, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(${this.color}, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${this.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      pulsePhase: number;

      constructor() {
        const width = canvas?.width || window.innerWidth;
        const height = canvas?.height || window.innerHeight;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = 0;
        this.pulsePhase = Math.random() * Math.PI * 2;
        
        // GSAP shimmer animation for particles
        gsap.to(this, {
          opacity: Math.random() * 0.6 + 0.3,
          duration: Math.random() * 2 + 1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
        
        const colors = [
          "147, 51, 234",   // Purple
          "168, 85, 247",   // Light purple  
          "59, 130, 246",   // Blue
          "139, 92, 246",   // Violet
          "236, 72, 153",   // Pink
          "167, 139, 250",  // Light violet
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        if (!canvas) return;
        
        // Smooth base movement
        this.baseX += this.speedX;
        this.baseY += this.speedY;

        // Mouse interaction - particles react to cursor
        const dx = mouseX - this.baseX;
        const dy = mouseY - this.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          this.x = this.baseX - Math.cos(angle) * force * 30;
          this.y = this.baseY - Math.sin(angle) * force * 30;
        } else {
          // Return to base position smoothly
          this.x += (this.baseX - this.x) * 0.1;
          this.y += (this.baseY - this.y) * 0.1;
        }

        // Pulse size effect
        this.pulsePhase += 0.02;

        // Wrap around screen
        if (this.baseX > canvas.width) this.baseX = 0;
        if (this.baseX < 0) this.baseX = canvas.width;
        if (this.baseY > canvas.height) this.baseY = 0;
        if (this.baseY < 0) this.baseY = canvas.height;
      }

      draw() {
        if (!ctx) return;
        const pulsatingSize = this.size + Math.sin(this.pulsePhase) * 0.5;
        
        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.color}, ${this.opacity})`;
        
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulsatingSize, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
      }
    }

    const init = () => {
      particles = [];
      orbs = [];
      
      // Create particles
      const particleCount = Math.floor((canvas.width * canvas.height) / 12000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }

      // Create floating orbs
      const orbCount = 5;
      for (let i = 0; i < orbCount; i++) {
        orbs.push(new FloatingOrb());
      }
    };

    const connectParticles = () => {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = 0.15 * (1 - distance / 120);
            
            // Premium gradient line
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, `rgba(${particles[i].color}, ${opacity})`);
            gradient.addColorStop(1, `rgba(${particles[j].color}, ${opacity})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!ctx) return;
      
      // Subtle fade effect instead of clear for premium trail
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update orbs first (background layer)
      orbs.forEach((orb) => {
        orb.update();
        orb.draw();
      });

      // Draw particles and connections
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
    </div>
  );
}
