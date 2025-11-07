import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "./ui/card";
import {
  Code2,
  Layers,
  Palette,
  Database,
  Cpu,
  Zap,
  Globe,
  Box,
} from "lucide-react";

const skills = [
  { name: "React & Next.js", icon: Code2, color: "from-blue-500 to-cyan-500" },
  { name: "APIs", icon: Layers, color: "from-blue-600 to-blue-400" },
  { name: "Python & Java", icon: Box, color: "from-purple-500 to-pink-500" },
  { name: "TypeScript & Tailwind CSS", icon: Palette, color: "from-cyan-500 to-blue-500" },
  { name: "Node.js", icon: Cpu, color: "from-green-500 to-emerald-500" },
  { name: "MySQL & MongoDB", icon: Database, color: "from-pink-500 to-rose-500" },
  { name: "Machine Learning", icon: Zap, color: "from-yellow-500 to-orange-500" },
  { name: "Git & Github", icon: Globe, color: "from-violet-500 to-purple-500" },
  
];

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30"
      data-testid="section-skills"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="p-6 text-center hover-elevate active-elevate-2 cursor-pointer h-full"
                data-testid={`skill-card-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${skill.color} mb-4`}>
                  <skill.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-sm">{skill.name}</h3>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
