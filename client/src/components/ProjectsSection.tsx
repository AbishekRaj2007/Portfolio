import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "./ui/badge";

const projects = [
  {
    id: 1,
    title: "Post Dost",
    description: "An AI powered Mobile Application for generating culturally aware posts and captions for Businesses.",
    tags: ["Next.js", "TypeScript", "Gemini API", "Stability AI"],
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    id: 2,
    title: "LanceWithUS",
    description: " A freelance marketplace platform connecting clients with top-tier freelancers globally.",
    tags: ["React", "TypeScript", "Email js", "Tailwind CSS"],
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    title: "Fake News Detector",
    description: "A web application that utilizes machine learning to identify and flag fake news articles in real-time.",
    tags: ["Sci-kit Learn", "Python"],
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    id: 4,
    title: "Expense Tracker",
    description: "A personal finance management tool for tracking expenses and budgeting.",
    tags: ["HTML", "CSS","JS", "MongoDB"],
    gradient: "from-violet-500/20 to-purple-500/20",
  },
];

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8"
      data-testid="section-projects"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              <Card
                className="overflow-hidden hover-elevate h-full flex flex-col"
                data-testid={`project-card-${project.id}`}
              >
                <div
                  className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
                >
                  <motion.div
                    className="text-6xl font-bold opacity-20"
                    animate={{
                      scale: hoveredProject === project.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.id.toString().padStart(2, "0")}
                  </motion.div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display font-bold text-2xl mb-3">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="hover-elevate"
                        data-testid={`tag-${tag.toLowerCase()}`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover-elevate active-elevate-2 flex-1"
                      data-testid={`button-view-demo-${project.id}`}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Demo
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover-elevate active-elevate-2 flex-1"
                      data-testid={`button-github-${project.id}`}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
