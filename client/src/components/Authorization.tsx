import { Comment } from "@/features/comments/apis/comment-api";
import { Issue } from "@/features/issues/apis/issue-api";
import { getMembers } from "@/features/projects/apis/project-api";
import { Member } from "@/features/projects/components/MembersList";
import { CurrentUser, getCurrentUser } from "@/features/users/apis/user-api";
import { useQuery } from "@tanstack/react-query";

const POLICIES_CONFIG = {
  "project:edit": { allowedRoles: ["admin"] },
  "project:delete": { allowedRoles: ["admin"] },
  "member:add": { allowedRoles: ["admin"] },
  "member:remove": { allowedRoles: ["admin"] },
  "category:add": { allowedRoles: ["admin"] },
  "category:edit": { allowedRoles: ["admin"] },
  "category:delete": { allowedRoles: ["admin"] },
  "issue:edit": { allowedRoles: ["admin", "reporter", "assignee"] },
  "issue:delete": { allowedRoles: ["admin"] },
  "issue:assign": { allowedRoles: ["admin", "member"] },
  "comment:edit": { allowedRoles: ["admin", "commenter"] },
  "comment:delete": { allowedRoles: ["admin", "commenter"] },
};

export function useAuthorization({
  projectId,
  issue,
  comment,
}: {
  projectId?: string;
  issue?: Issue;
  comment?: Comment;
}) {
  const currentUserQuery = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
  const membersQuery = useQuery({
    queryKey: ["projects", projectId, "members"],
    queryFn: () => getMembers({ projectId } as { projectId: string }),
  });

  const isLoading =
    currentUserQuery.isFetching ||
    currentUserQuery.isLoading ||
    membersQuery.isFetching ||
    membersQuery.isLoading;

  if (isLoading) return { isLoading };

  const currentUser = currentUserQuery.data.currentUser as CurrentUser;
  const creator = membersQuery.data.project.Creator as Member;
  const members = membersQuery.data.project.Members as Member[];
  const reporter = issue?.Reporter;
  const assignee = issue?.Assignee;
  const commenter = comment?.User;
  return { currentUser, creator, members, reporter, assignee, commenter };
}

interface AuthorizationProps {
  projectId?: string;
  issue?: Issue;
  comment?: Comment;
  action: string;
  children: React.ReactNode;
}

export function Authorization({
  projectId,
  issue,
  comment,
  action,
  children,
}: AuthorizationProps) {
  const {
    isLoading,
    currentUser,
    creator,
    members,
    reporter,
    assignee,
    commenter,
  } = useAuthorization({ projectId, issue, comment });

  if (isLoading) return null;

  // * get the list of user roles
  const getUserRoles = () => {
    const roles = [];
    if (currentUser.id === creator.id) {
      roles.push("admin");
    }
    if (members.map((member) => member.id).includes(currentUser.id)) {
      roles.push("member");
    }
    if (currentUser.id === reporter?.id) {
      roles.push("reporter");
    }
    if (currentUser.id === assignee?.id) {
      roles.push("assignee");
    }
    if (currentUser.id === commenter?.id) {
      roles.push("commenter");
    }
    return roles;
  };

  // * check if user role is in allowed role
  const isAuthorized = () => {
    const roles = getUserRoles();

    if (!Object.keys(POLICIES_CONFIG).includes(action)) {
      return false;
    }

    const allowedRoles =
      POLICIES_CONFIG[action as keyof typeof POLICIES_CONFIG].allowedRoles;

    return roles.some((role) => allowedRoles.includes(role));
  };

  return isAuthorized() ? children : null;
}
