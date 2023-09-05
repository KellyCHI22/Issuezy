import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 7,
    name: "project 7",
    description: "This is project 7 and its public",
    creatorId: 1,
    createdAt: "2023-08-30T15:00:35.000Z",
    Creator: {
      id: 1,
      name: "user1",
    },
    Members: [
      {
        id: 1,
        name: "user1",
      },
    ],
    Issues: [],
  },
  {
    id: 6,
    name: "project 6",
    description: "This is project 6 and its private",
    creatorId: 1,
    createdAt: "2023-08-30T14:54:43.000Z",
    Creator: {
      id: 1,
      name: "user1",
    },
    Members: [
      {
        id: 2,
        name: "user2",
      },
      {
        id: 3,
        name: "user3",
      },
      {
        id: 1,
        name: "user1",
      },
    ],
    Issues: [
      {
        id: 6,
        title: "this is the second issue",
      },
      {
        id: 7,
        title: "this is the second issue",
      },
      {
        id: 8,
        title: "this is the eighth issue",
      },
    ],
  },
  {
    id: 5,
    name: "project 5",
    description: "This is project 5 and its private",
    creatorId: 1,
    createdAt: "2023-08-30T14:18:29.000Z",
    Creator: {
      id: 1,
      name: "user1",
    },
    Members: [
      {
        id: 3,
        name: "user3",
      },
      {
        id: 1,
        name: "user1",
      },
    ],
    Issues: [
      {
        id: 1,
        title: "this is the first issue",
      },
      {
        id: 2,
        title: "this is the second issue",
      },
      {
        id: 4,
        title: "this is the second issue",
      },
      {
        id: 5,
        title: "this is the second issue",
      },
    ],
  },
];

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
          <Button className="">Add Project</Button>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
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
