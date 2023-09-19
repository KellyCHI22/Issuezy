import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  user: {
    id: number;
    firstname: string;
    lastname: string;
  };
}

export default function UserAvatar({ user }: UserAvatarProps) {
  return (
    <Avatar className="bg-violet-500">
      <AvatarFallback className="bg-primary tracking-widest text-white">
        {user?.firstname[0]}
        {user?.lastname[0]}
      </AvatarFallback>
    </Avatar>
  );
}
