import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "./ui/card";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    id: 1,
    role: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    period: "2022 - Present",
    description: "Leading development of next-generation web applications using React, Three.js, and modern animation libraries.",
    achievements: [
      "Built award-winning 3D product configurator",
      "Improved performance by 40% through optimization",
      "Mentored team of 5 junior developers",
    ],
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Creative Studio",
    period: "2020 - 2022",
    description: "Developed interactive websites and web applications for high-profile clients.",
    achievements: [
      "Delivered 15+ client projects on time",
      "Implemented WebGL experiences for major brands",
      "Established best practices for team workflow",
    ],
  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "StartupXYZ",
    period: "2018 - 2020",
    description: "Built responsive web applications and contributed to product development.",
    achievements: [
      "Developed core features used by 100k+ users",
      "Reduced bundle size by 60%",
      "Implemented comprehensive testing suite",
    ],
  },
];

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30"
      data-testid="section-experience"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
                }
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="md:pl-20">
                  <div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-primary border-4 border-background hidden md:block" />

                  <Card className="p-6 hover-elevate" data-testid={`experience-card-${exp.id}`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <Briefcase className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-xl mb-1">
                          {exp.role}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground">
                          <span className="font-medium">{exp.company}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="text-sm">{exp.period}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      {exp.description}
                    </p>

                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-primary mt-1">▸</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
