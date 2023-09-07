import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar() {
  // todo add user firstname and lastname
  return (
    <Avatar className="bg-violet-500">
      <AvatarImage src="" />
      <AvatarFallback className="bg-primary text-white">CN</AvatarFallback>
    </Avatar>
  );
}
