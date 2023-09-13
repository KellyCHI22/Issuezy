import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar({ user }) {
  return (
    <Avatar className="bg-violet-500">
      <AvatarImage src="" />
      <AvatarFallback className="bg-primary tracking-widest text-white">
        {user?.firstname[0]}
        {user?.lastname[0]}
      </AvatarFallback>
    </Avatar>
  );
}
