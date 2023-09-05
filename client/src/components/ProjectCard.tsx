import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProjectCard({ project }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Created by: {project.Creator.name}</p>
        <p>Members: {project.Members.length}</p>
        <p>Issues: {project.Issues.length}</p>
      </CardContent>
      <CardFooter>
        <p>Created at: {project.createdAt}</p>
      </CardFooter>
    </Card>
  );
}
