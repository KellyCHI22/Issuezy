import UserAvatar from "@/components/UserAvatar";
import { useQuery } from "@tanstack/react-query";
import { getMembers } from "@/features/projects/apis/project-api";
import { Badge } from "@/components/ui/badge";
import { AddMemberSheet } from "./AddMemberSheet";
import { RemoveMemberAlert } from "./RemoveMemberAlert";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Authorization } from "@/components/Authorization";

export type Member = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
};

export function MembersList({ projectId }: { projectId: string }) {
  const [isOpen, setIsOpen] = useState(true);
  const projectQuery = useQuery({
    queryKey: ["projects", projectId, "members"],
    queryFn: () => getMembers(projectId),
  });

  if (projectQuery.isLoading || projectQuery.isFetching)
    return (
      <div className="rounded-lg bg-white p-6 dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <h3 className="text-lg font-bold">Members</h3>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </div>
        </div>
      </div>
    );
  if (projectQuery.status === "error") {
    return <h1>Something went wrong</h1>;
  }

  const creator = projectQuery.data.project.Creator as Member;
  const members = projectQuery.data.project.Members as Member[];

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-lg bg-white p-6 dark:bg-gray-900"
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex gap-3">
          <h3 className="text-lg font-bold">Members</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <Authorization projectId={projectId} action="member:add">
          <AddMemberSheet projectId={projectId} />
        </Authorization>
      </div>
      <div className="mb-2">
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
        {members.length > 0 && (
          <CollapsibleContent className="space-y-8 pt-8">
            {members.map((member) => (
              <div key={member.id} className="flex items-center">
                <UserAvatar user={member} />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {member.firstname} {member.lastname}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.email}
                  </p>
                </div>
                <Authorization projectId={projectId} action="member:remove">
                  <RemoveMemberAlert member={member} projectId={projectId} />
                </Authorization>
              </div>
            ))}
          </CollapsibleContent>
        )}
      </div>
    </Collapsible>
  );
}
