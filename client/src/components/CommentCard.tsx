import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatTime } from "@/lib/utils";
import UserAvatar from "./UserAvatar";

export default function CommentCard({ comment }) {
  return (
    <Card className="dark:bg-gray-900">
      <CardHeader className="">
        <CardDescription className="flex flex-row items-start justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar user={comment.User} />
            <span>{comment.User.firstname}</span>
            <span>{comment.User.lastname}</span>
          </div>
          <span>{formatTime(comment.createdAt)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>{comment.text}</CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
