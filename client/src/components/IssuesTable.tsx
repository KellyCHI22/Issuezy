import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

export default function IssuesTable({ issues }) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Reporter</TableHead>
          <TableHead>Assignee</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {issues.map((issue) => (
          <TableRow key={issue.id}>
            <TableCell className="font-medium">
              <Link to={`/projects/1/issues/${issue.id}`}>{issue.title}</Link>
            </TableCell>
            <TableCell>{issue.Category.name}</TableCell>
            <TableCell>{issue.status}</TableCell>
            <TableCell>{issue.priority}</TableCell>
            <TableCell>{issue.Reporter.name}</TableCell>
            <TableCell>{issue.Assignee.name}</TableCell>
            <TableCell>{issue.createdAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
