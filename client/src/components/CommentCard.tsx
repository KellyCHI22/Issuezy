import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CommentCard({ comment }) {
  return (
    <Card>
      <CardHeader>
        {/* <CardTitle>{comment.User.name}</CardTitle> */}
        <CardDescription>{comment.User.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{comment.text}</p>
      </CardContent>
      <CardFooter>
        <p>Created at: {comment.createdAt}</p>
      </CardFooter>
    </Card>
  );
}
