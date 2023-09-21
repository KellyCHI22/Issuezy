import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatTime } from "@/utils";
import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { EditCommentSheet } from "./EditCommentSheet";
import { DeleteCommentAlert } from "./DeleteCommentAlert";
import { Comment } from "@/features/comments/apis/comment-api";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

interface CommentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  comment: Comment;
  projectId?: string;
  issueId?: string;
}

export function CommentCard({ comment, projectId, issueId }: CommentCardProps) {
  const [showEditSheet, setShowEditSheet] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
              <DropdownMenuItem onSelect={() => setShowEditSheet(true)}>
                <Pencil className="mr-2 h-4 w-4" /> Edit comment
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onSelect={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete comment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <EditCommentSheet
            projectId={projectId}
            issueId={issueId}
            comment={comment}
            showEditSheet={showEditSheet}
            setShowEditSheet={setShowEditSheet}
          />
          <DeleteCommentAlert
            projectId={projectId}
            issueId={issueId}
            comment={comment}
            showDeleteDialog={showDeleteDialog}
            setShowDeleteDialog={setShowDeleteDialog}
          />
        </div>
        <p className="pb-2 pt-4">{comment.text}</p>
      </CardContent>
    </Card>
  );
}
