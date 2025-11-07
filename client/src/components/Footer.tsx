import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-border" data-testid="footer">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="font-display font-bold text-2xl mb-2">
              Let's Create Something Amazing
            </h3>
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} Portfolio. All rights reserved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
          >
            <a href="#home" className="hover:text-foreground transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-foreground transition-colors">
              About
            </a>
            <a href="#projects" className="hover:text-foreground transition-colors">
              Projects
            </a>
            <a href="#contact" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Button
          size="icon"
          onClick={scrollToTop}
          className="rounded-full shadow-lg hover-elevate active-elevate-2"
          data-testid="button-scroll-to-top"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </motion.div>
    </footer>
  );
}
