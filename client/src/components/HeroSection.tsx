import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { AnimatedBackground } from "./AnimatedBackground";
import { FloatingShapes } from "./FloatingShapes";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate title with split text effect
    if (titleRef.current) {
      const originalText = titleRef.current.innerText;
      const chars = originalText.split('');
      titleRef.current.innerHTML = chars.map(char => 
        `<span style="display: inline-block; background: linear-gradient(to right, hsl(var(--primary)), hsl(var(--chart-2)), hsl(var(--chart-3))); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');
      
      tl.from(titleRef.current.children, {
        opacity: 0,
        y: 50,
        rotationX: -90,
        stagger: 0.02,
        duration: 0.8,
        ease: "back.out(1.7)"
      });
    }
    
    // Animate subtitle
    if (subtitleRef.current) {
      tl.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4");
    }
    
    // Animate buttons
    if (buttonsRef.current) {
      tl.from(buttonsRef.current.children, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.3");
    }
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
      <AnimatedBackground />
      <FloatingShapes />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            ref={titleRef}
            className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6"
          >
            Abishek Raj R R
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-12 max-w-3xl mx-auto"
          >
            Building immersive digital experiences with modern web technologies
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("#projects")}
              className="hover-elevate active-elevate-2 text-lg px-8"
              data-testid="button-view-projects"
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("#contact")}
              className="hover-elevate active-elevate-2 text-lg px-8"
              data-testid="button-get-in-touch"
            >
              Get in Touch
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scrollToSection("#about")}
            className="rounded-full hover-elevate"
            data-testid="button-scroll-down"
          >
            <ChevronDown className="w-6 h-6" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
