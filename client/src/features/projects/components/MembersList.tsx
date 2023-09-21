import UserAvatar from "@/components/UserAvatar";
import { useQuery } from "@tanstack/react-query";
import { getMembers } from "@/features/projects/apis/project-api";
import { Badge } from "@/components/ui/badge";
import { AddMemberSheet } from "./AddMemberSheet";
import { RemoveMemberAlert } from "./RemoveMemberAlert";

export type Member = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
};

export function MembersList({ projectId }: { projectId: string }) {
  const projectQuery = useQuery({
    queryKey: ["projects", projectId, "members"],
    queryFn: () => getMembers(projectId),
  });

  if (projectQuery.isLoading || projectQuery.isFetching)
    return (
      <div>
        <div className="mb-5 flex justify-between">
          <h2 className="text-xl font-bold">Members</h2>
          <AddMemberSheet projectId={projectId} />
        </div>
      </div>
    );
  if (projectQuery.status === "error") {
    return <h1>Something went wrong</h1>;
  }

  const creator = projectQuery.data.project.Creator as Member;
  const members = projectQuery.data.project.Members as Member[];

  return (
    <div>
      <div className="mb-5 flex justify-between">
        <h2 className="text-xl font-bold">Members</h2>
        <AddMemberSheet projectId={projectId} />
      </div>
      <div className="mb-2 space-y-8">
        <div key={creator.id} className="flex items-center justify-between">
          <div className="flex items-center">
            <UserAvatar user={creator} />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {creator.firstname} {creator.lastname}
              </p>
              <p className="text-sm text-muted-foreground">{creator.email}</p>
            </div>
          </div>
          <Badge>Creator</Badge>
        </div>
        {members.map((member) => (
          <div key={member.id} className="flex items-center">
            <UserAvatar user={member} />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {member.firstname} {member.lastname}
              </p>
              <p className="text-sm text-muted-foreground">{member.email}</p>
            </div>
            <RemoveMemberAlert member={member} projectId={projectId} />
          </div>
        ))}
      </div>
    </div>
  );
}
