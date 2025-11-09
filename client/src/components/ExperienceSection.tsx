import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "./ui/card";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    id: 1,
    role: "VisionX Hackathon 2nd Runner-Up",
    company: "Chennai Institute of Technology",
    period: "2025",
    description: "Developed an innovative Railway Management System using AI and IoT technologies.",
    achievements: [
      "Built award-winning design",
      "Improved performance by advancing AI algorithms",
      "Worked with a team of 3 members",
    ],
  },
  {
    id: 2,
    role: "Solved 500+ Leetcode Problems",
    company: "Leetcode",
    period: "2025",
    description:"Solved over 500 problems on Leetcode, enhancing problem-solving skills and algorithmic thinking.",
    achievements: [
      "Delivered efficient solutions in various programming languages",
      "Implemented optimized algorithms for complex problems",
      "Established consistent problem-solving strategies",
    ],
  },
  {
    id: 3,
    role: "AIML Certified by Google for Developers",
    company: "Google",
    period: "2025",
    description: "Completed AIML certification program by Google for Developers, gaining expertise in AI and machine learning technologies.",
    achievements: [
      "Developed proficiency in machine learning frameworks",
      "Reduced model training time by optimizing algorithms",
      "Implemented AI solutions for real-world applications",
    ],
  },
  {
    id: 4,
    role: "AWS IoT Cloud Engineer Certified by Google for Developers",
    company: "Google",
    period: "2025",
    description: "Completed AWS IoT Cloud Engineer certification program by Google for Developers, gaining expertise in cloud and IoT technologies.",
    achievements: [
      "Developed proficiency in cloud computing and IoT frameworks",
      "Reduced deployment time by optimizing cloud infrastructure",
      "Gained hands-on experience with AWS IoT services",
    ],
  },
  {
    id: 5,
    role: "MongoDB Certified Developer",
    company: "MongoDB",
    period: "2025",
    description: "Completed MongoDB Developer certification program by Google for Developers, gaining expertise in database management and development.",
    achievements: [
      "Delivered efficient database solutions",
      "Efficiently managed and optimized database performance",
      "Implemented scalable database architectures",
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
            Certiications & Achievements
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
