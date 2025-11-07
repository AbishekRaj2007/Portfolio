import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "./ui/badge";

const projects = [
  {
    id: 1,
    title: "3D Product Configurator",
    description: "Interactive 3D product visualization with real-time customization and AR preview capabilities.",
    tags: ["Three.js", "React", "WebGL"],
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    id: 2,
    title: "AI-Powered Dashboard",
    description: "Real-time analytics dashboard with machine learning insights and predictive visualizations.",
    tags: ["Next.js", "TypeScript", "D3.js"],
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    title: "Metaverse Gallery",
    description: "Virtual art gallery experience with NFT integration and multiplayer social features.",
    tags: ["WebXR", "Web3", "GSAP"],
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    id: 4,
    title: "Creative Studio Site",
    description: "Award-winning portfolio website with smooth animations and immersive storytelling.",
    tags: ["Framer Motion", "Tailwind", "Vite"],
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
