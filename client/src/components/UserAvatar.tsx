import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/utils";

interface UserAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  user: {
    id: number;
    firstname: string;
    lastname: string;
  };
}

export default function UserAvatar({ user, className }: UserAvatarProps) {
  return (
    <Avatar className={cn("bg-violet-500 text-base", className)}>
      <AvatarFallback className="bg-primary tracking-widest text-white">
        {user?.firstname[0]}
        {user?.lastname[0]}
      </AvatarFallback>
    </Avatar>
  );
}
