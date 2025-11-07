import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Observe sections and set the active nav link based on which section is in view
  useEffect(() => {
    const sections = navLinks
      .map((l) => l.href)
      .map((href) => document.querySelector(href))
      .filter(Boolean) as Element[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the entry with highest intersectionRatio that's intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible && visible.target && visible.target.id) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: '-40% 0px -40% 0px',
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? // glassmorphism: frosted backdrop + translucent background + subtle border and shadow
            "backdrop-blur-xl bg-white/30 dark:bg-slate-900/30 border border-white/10 dark:border-white/20 shadow-lg"
          : "bg-transparent"
      }`}
      data-testid="nav-main"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-display font-bold text-xl bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent"
          >
            Portfolio
          </motion.div>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(link.href)}
                  className={`hover-elevate transition-all duration-200 ${
                    activeSection === link.href
                      ? // active glass highlight
                        "bg-white/30 dark:bg-slate-800/40 text-primary border border-white/20 dark:border-white/10 backdrop-blur-sm rounded-md px-3 py-1 shadow-md"
                      : ""
                  }`}
                  aria-current={activeSection === link.href ? "page" : undefined}
                  data-testid={`nav-link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover-elevate"
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden hover-elevate"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden backdrop-blur-xl bg-white/25 dark:bg-slate-900/40 border-t border-white/10 dark:border-white/20"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  onClick={() => scrollToSection(link.href)}
                  className={`w-full justify-start hover-elevate transition-all duration-150 ${
                    activeSection === link.href
                      ? "bg-white/25 dark:bg-slate-800/40 rounded-md px-3 py-2 border border-white/10 dark:border-white/20 shadow-sm"
                      : ""
                  }`}
                  data-testid={`mobile-nav-link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
