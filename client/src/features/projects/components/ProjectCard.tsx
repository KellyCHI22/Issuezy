import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatTime } from "@/utils";
import { Badge } from "../../../components/ui/badge";
import UserAvatar from "../../../components/UserAvatar";
import { type Project } from "@/features/projects/apis/project-api";
interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const filteredIssues = project.Issues.filter(
    (issue) => issue.isDeleted !== true,
  );
  return (
    <Card className="border-transparent hover:border-solid hover:border-violet-600 dark:bg-gray-900 lg:flex lg:h-full lg:flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <span>
          <Badge className={project.isPublic ? "" : "bg-pink-500"}>
            {project.isPublic ? "public" : "private"}
          </Badge>
        </span>
        <span className="align-text-top text-zinc-400">
          {formatTime(project.createdAt)}
        </span>
      </CardHeader>
      <CardContent className="mb-3 flex-1 space-y-4">
        <CardTitle className="leading-tight">{project.name}</CardTitle>
        <CardDescription className="line-clamp-2 h-10 overflow-hidden">
          {project.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="grid auto-rows-max grid-cols-3 grid-rows-1 gap-2">
        <div className="flex h-full flex-col items-center justify-center gap-1 rounded-lg bg-gray-100 p-2  dark:bg-gray-800">
          <span className="text-sm text-zinc-400">Creator</span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-center">
            <UserAvatar user={project.Creator} />
          </span>
        </div>
        <div className="flex h-full flex-col items-center rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
          <span className="text-sm text-zinc-400">Members</span>
          <p className="grid h-[40px] w-[40px] items-center text-center font-bold">
            <span>{project.Members.length}</span>
          </p>
        </div>
        <div className="flex h-full flex-col items-center rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
          <span className="text-sm text-zinc-400">Issues</span>
          <p className="grid h-[40px] w-[40px] items-center text-center font-bold">
            <span>{filteredIssues.length}</span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
