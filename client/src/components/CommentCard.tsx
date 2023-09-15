import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatTime } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";

export default function CommentCard({ comment }) {
  return (
    <Card className="dark:bg-gray-900">
      <CardContent>
        <div className="flex flex-row items-center justify-between pt-6 text-sm text-muted-foreground">
          <div className="flex items-center">
            <UserAvatar user={comment.User} />
            <div className="hidden space-x-1 px-3 lg:block">
              <span>{comment.User.firstname}</span>
              <span>{comment.User.lastname}</span>
            </div>
            <span className="pl-3 lg:p-0">{formatTime(comment.createdAt)}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit comment</DropdownMenuItem>
              <DropdownMenuItem>Delete comment</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="pb-2 pt-4">{comment.text}</p>
      </CardContent>
    </Card>
  );
}
