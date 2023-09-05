import CommentCard from "@/components/CommentCard";
import { Button } from "@/components/ui/button";

const comments = [
  {
    id: 1,
    text: "This is another comment",
    issueId: 6,
    userId: 2,
    isDeleted: false,
    createdAt: "2023-09-02T20:15:09.000Z",
    updatedAt: "2023-09-02T20:15:09.000Z",
    User: {
      id: 3,
      name: "user3",
    },
  },
  {
    id: 2,
    text: "This is another comment",
    issueId: 6,
    userId: 2,
    isDeleted: false,
    createdAt: "2023-09-02T20:15:09.000Z",
    updatedAt: "2023-09-02T20:15:09.000Z",
    User: {
      id: 3,
      name: "user3",
    },
  },
  {
    id: 3,
    text: "This is another comment",
    issueId: 6,
    userId: 2,
    isDeleted: false,
    createdAt: "2023-09-02T20:15:09.000Z",
    updatedAt: "2023-09-02T20:15:09.000Z",
    User: {
      id: 3,
      name: "user3",
    },
  },
  {
    id: 4,
    text: "This is another comment",
    issueId: 6,
    userId: 2,
    isDeleted: false,
    createdAt: "2023-09-02T20:15:09.000Z",
    updatedAt: "2023-09-02T20:15:09.000Z",
    User: {
      id: 3,
      name: "user3",
    },
  },
];

export default function IssuePage() {
  return (
    <div className="lg:h-screen">
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex lg:mr-60">
        <div className="items-end justify-between space-y-2 lg:flex">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Issue One</h2>
            <p className="my-2 text-muted-foreground">
              This is the description of the issue
            </p>
          </div>
          <Button className="">Add comment</Button>
        </div>
        <h3 className="text-xl font-bold tracking-tight">Comments</h3>
        <div className="space-y-5 overflow-y-scroll">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}
