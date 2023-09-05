import IssuesTable from "@/components/IssuesTable";
import { Button } from "@/components/ui/button";

const issues = [
  {
    id: 5,
    title: "this is the second issue",
    description: "none",
    status: "open",
    priority: 2,
    categoryId: 3,
    reporterId: 1,
    assigneeId: 1,
    createdAt: "2023-09-01T15:13:55.000Z",
    updatedAt: "2023-09-01T15:13:55.000Z",
    Reporter: {
      id: 1,
      name: "user1",
    },
    Assignee: {
      id: 1,
      name: "user1",
    },
    Category: {
      id: 3,
      name: "improvement",
    },
  },
  {
    id: 4,
    title: "this is the second issue",
    description: "none",
    status: "open",
    priority: 2,
    categoryId: 3,
    reporterId: 1,
    assigneeId: 3,
    createdAt: "2023-09-01T15:13:26.000Z",
    updatedAt: "2023-09-01T15:13:26.000Z",
    Reporter: {
      id: 1,
      name: "user1",
    },
    Assignee: {
      id: 3,
      name: "user3",
    },
    Category: {
      id: 3,
      name: "improvement",
    },
  },
  {
    id: 2,
    title: "this is the second issue",
    description: "none",
    status: "open",
    priority: 2,
    categoryId: 3,
    reporterId: 1,
    assigneeId: 3,
    createdAt: "2023-09-01T15:07:04.000Z",
    updatedAt: "2023-09-01T15:07:04.000Z",
    Reporter: {
      id: 1,
      name: "user1",
    },
    Assignee: {
      id: 3,
      name: "user3",
    },
    Category: {
      id: 3,
      name: "improvement",
    },
  },
  {
    id: 1,
    title: "this is the first issue",
    description: "none",
    status: "open",
    priority: 1,
    categoryId: 4,
    reporterId: 1,
    assigneeId: 3,
    createdAt: "2023-09-01T15:04:44.000Z",
    updatedAt: "2023-09-01T15:04:44.000Z",
    Reporter: {
      id: 1,
      name: "user1",
    },
    Assignee: {
      id: 3,
      name: "user3",
    },
    Category: {
      id: 4,
      name: "task",
    },
  },
  {
    id: 9,
    title: "this is the first issue",
    description: "none",
    status: "open",
    priority: 1,
    categoryId: 4,
    reporterId: 1,
    assigneeId: 3,
    createdAt: "2023-09-01T15:04:44.000Z",
    updatedAt: "2023-09-01T15:04:44.000Z",
    Reporter: {
      id: 1,
      name: "user1",
    },
    Assignee: {
      id: 3,
      name: "user3",
    },
    Category: {
      id: 4,
      name: "task",
    },
  },
  {
    id: 10,
    title: "this is the first issue",
    description: "none",
    status: "open",
    priority: 1,
    categoryId: 4,
    reporterId: 1,
    assigneeId: 3,
    createdAt: "2023-09-01T15:04:44.000Z",
    updatedAt: "2023-09-01T15:04:44.000Z",
    Reporter: {
      id: 1,
      name: "user1",
    },
    Assignee: {
      id: 3,
      name: "user3",
    },
    Category: {
      id: 4,
      name: "task",
    },
  },
  {
    id: 10,
    title: "this is the first issue",
    description: "none",
    status: "open",
    priority: 1,
    categoryId: 4,
    reporterId: 1,
    assigneeId: 3,
    createdAt: "2023-09-01T15:04:44.000Z",
    updatedAt: "2023-09-01T15:04:44.000Z",
    Reporter: {
      id: 1,
      name: "user1",
    },
    Assignee: {
      id: 3,
      name: "user3",
    },
    Category: {
      id: 4,
      name: "task",
    },
  },
  {
    id: 10,
    title: "this is the first issue",
    description: "none",
    status: "open",
    priority: 1,
    categoryId: 4,
    reporterId: 1,
    assigneeId: 3,
    createdAt: "2023-09-01T15:04:44.000Z",
    updatedAt: "2023-09-01T15:04:44.000Z",
    Reporter: {
      id: 1,
      name: "user1",
    },
    Assignee: {
      id: 3,
      name: "user3",
    },
    Category: {
      id: 4,
      name: "task",
    },
  },
  {
    id: 10,
    title: "this is the first issue",
    description: "none",
    status: "open",
    priority: 1,
    categoryId: 4,
    reporterId: 1,
    assigneeId: 3,
    createdAt: "2023-09-01T15:04:44.000Z",
    updatedAt: "2023-09-01T15:04:44.000Z",
    Reporter: {
      id: 1,
      name: "user1",
    },
    Assignee: {
      id: 3,
      name: "user3",
    },
    Category: {
      id: 4,
      name: "task",
    },
  },
];

export default function ProjectPage() {
  return (
    <div className="lg:h-screen">
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="items-end justify-between space-y-2 lg:flex">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Project One</h2>
            <p className="my-2 text-muted-foreground">
              This is the description of the project
            </p>
          </div>
          <Button className="">Add Issue</Button>
        </div>
        <div className="overflow-y-scroll">
          <IssuesTable issues={issues} />
        </div>
      </div>
    </div>
  );
}
