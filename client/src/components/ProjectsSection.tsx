import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "./ui/badge";
import { desc } from "drizzle-orm";

const projects = [
  {
    id: 1,
    title: "Post Dost",
    image: "/postdost.png",
    description: "An AI powered Mobile Application for generating culturally aware posts and captions for Businesses.",
    github: "https://github.com/AbishekRaj2007/post-dost",
    demo: undefined,
    tags: ["Next.js", "TypeScript", "Gemini API", "Stability AI"],
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    id: 2,
    title: "LanceWithUS",
    image: "/lancewithus.png",
    description: " A freelance marketplace platform connecting clients with top-tier freelancers globally.",
    github: "https://github.com/AbishekRaj2007/lancewithus",
    demo: undefined,
    tags: ["React", "TypeScript", "Email js", "Tailwind CSS"],
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    title: "Fake News Detector",
    image: "/fakenewsdetector.jpg",
    description: "A web application that utilizes machine learning to identify and flag fake news articles in real-time.",
    github: "https://github.com/AbishekRaj2007/Fake-News-Detector",
    tags: ["Sci-kit Learn", "Python"],
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    id: 4,
    title: "Eco Trail",
    description: "A mobile application that promotes eco-friendly travel by providing users with sustainable travel options and tips.",
    github: "https://github.com/AbishekRaj2007/Eco-Trail"
  ,
  demo: undefined,
    tags: ["React Native", "CSS", "JS", "MongoDB"],
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
            Projects
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
                <div className="h-48 flex items-center justify-center relative overflow-hidden">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                  )}

                  {/* gradient overlay (keeps existing style when image is present) */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} ${project.image ? "opacity-40" : ""} z-5`}
                  />

                  <motion.div
                    className="text-6xl font-bold opacity-20 relative z-10"
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
                    {project.demo ? (
                      <Button asChild variant="outline" size="sm" className="hover-elevate active-elevate-2 flex-1">
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" data-testid={`button-view-demo-${project.id}`}>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Demo
                        </a>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover-elevate active-elevate-2 flex-1"
                        data-testid={`button-view-demo-${project.id}`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Demo
                      </Button>
                    )}

                    {project.github ? (
                      <Button asChild variant="outline" size="sm" className="hover-elevate active-elevate-2 flex-1">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" data-testid={`button-github-${project.id}`}>
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover-elevate active-elevate-2 flex-1"
                        data-testid={`button-github-${project.id}`}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    )}
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
