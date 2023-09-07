import { ProjectSheet } from "@/components/ProjectSheet";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { projects } from "@/dummyData";

export default function AllProjectsPage() {
  return (
    <div className="overflow-y-scroll lg:h-screen">
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="items-end justify-between space-y-2 lg:flex">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
            <p className="my-2 text-muted-foreground">
              Here is s a list of your projects!
            </p>
          </div>
          <ProjectSheet />
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:overflow-y-scroll">
          {projects.map((project) => (
            <Link to={`/projects/${project.id}`}>
              {" "}
              <ProjectCard key={project.id} project={project} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
