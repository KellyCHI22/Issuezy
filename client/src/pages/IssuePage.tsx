import CommentCard from "@/components/CommentCard";
import { CommentSheet } from "@/components/CommentSheet";
import { comments } from "@/dummyData";

export default function IssuePage() {
  return (
    <div className="lg:h-screen">
      <div className="h-full flex-1 flex-col space-y-4 p-8 md:flex lg:mr-60">
        <div className="items-end justify-between space-y-2 lg:flex">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Issue One</h2>
            <p className="mt-2 text-muted-foreground">
              This is the description of the issue
            </p>
          </div>
          <CommentSheet />
        </div>
        <h3 className="text-xl font-bold tracking-tight">Comments</h3>
        <div className="space-y-5 lg:overflow-y-scroll">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}
