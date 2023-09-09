import type { Issue } from "./components/issueColumns";

export const projects = [
  {
    id: 7,
    name: "project 7",
    description:
      "This is project 7 and its public This is project 7 and its publicThis is project 7 and its publicThis is project 7 and its public",
    creatorId: 1,
    createdAt: "2023-08-30T15:00:35.000Z",
    Creator: {
      id: 1,
      name: "user1234567",
    },
    Members: [
      {
        id: 1,
        name: "user1",
      },
    ],
    Issues: [],
  },
  {
    id: 6,
    name: "project 6",
    description: "This is project 6 and its private",
    creatorId: 1,
    createdAt: "2023-08-30T14:54:43.000Z",
    Creator: {
      id: 1,
      name: "user1",
    },
    Members: [
      {
        id: 2,
        name: "user2",
      },
      {
        id: 3,
        name: "user3",
      },
      {
        id: 1,
        name: "user1",
      },
    ],
    Issues: [
      {
        id: 6,
        title: "this is the second issue",
      },
      {
        id: 7,
        title: "this is the second issue",
      },
      {
        id: 8,
        title: "this is the eighth issue",
      },
    ],
  },
  {
    id: 5,
    name: "project 5",
    description: "This is project 5 and its private",
    creatorId: 1,
    createdAt: "2023-08-30T14:18:29.000Z",
    Creator: {
      id: 1,
      name: "user1",
    },
    Members: [
      {
        id: 3,
        name: "user3",
      },
      {
        id: 1,
        name: "user1",
      },
    ],
    Issues: [
      {
        id: 1,
        title: "this is the first issue",
      },
      {
        id: 2,
        title: "this is the second issue",
      },
      {
        id: 4,
        title: "this is the second issue",
      },
      {
        id: 5,
        title: "this is the second issue",
      },
    ],
  },
  {
    id: 5,
    name: "project 5",
    description: "This is project 5 and its private",
    creatorId: 1,
    createdAt: "2023-08-30T14:18:29.000Z",
    Creator: {
      id: 1,
      name: "user1",
    },
    Members: [
      {
        id: 3,
        name: "user3",
      },
      {
        id: 1,
        name: "user1",
      },
    ],
    Issues: [
      {
        id: 1,
        title: "this is the first issue",
      },
      {
        id: 2,
        title: "this is the second issue",
      },
      {
        id: 4,
        title: "this is the second issue",
      },
      {
        id: 5,
        title: "this is the second issue",
      },
    ],
  },
  {
    id: 5,
    name: "project 5",
    description: "This is project 5 and its private",
    creatorId: 1,
    createdAt: "2023-08-30T14:18:29.000Z",
    Creator: {
      id: 1,
      name: "user1",
    },
    Members: [
      {
        id: 3,
        name: "user3",
      },
      {
        id: 1,
        name: "user1",
      },
    ],
    Issues: [
      {
        id: 1,
        title: "this is the first issue",
      },
      {
        id: 2,
        title: "this is the second issue",
      },
      {
        id: 4,
        title: "this is the second issue",
      },
      {
        id: 5,
        title: "this is the second issue",
      },
    ],
  },
];

export const issues: Issue[] = [
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
      firstname: "Jessica",
      lastname: "Chen",
    },
    Assignee: {
      id: 1,
      firstname: "Jessica",
      lastname: "Chen",
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
      firstname: "Jessica",
      lastname: "Chen",
    },
    Assignee: {
      id: 3,
      firstname: "Joanne",
      lastname: "Wang",
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
      firstname: "Jessica",
      lastname: "Chen",
    },
    Assignee: {
      id: 3,
      firstname: "Joanne",
      lastname: "Wang",
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
      firstname: "Jessica",
      lastname: "Chen",
    },
    Assignee: {
      id: 3,
      firstname: "Joanne",
      lastname: "Wang",
    },
    Category: {
      id: 4,
      name: "task",
    },
  },
];

export const comments = [
  {
    id: 1,
    text: "Praesent et iaculis odio. In porttitor porttitor semper. Aliquam molestie lobortis diam vitae varius. Vestibulum vulputate commodo auctor. Ut molestie ipsum in tristique posuere. ",
    issueId: 6,
    userId: 2,
    isDeleted: false,
    createdAt: "2023-09-02T20:15:09.000Z",
    updatedAt: "2023-09-02T20:15:09.000Z",
    User: {
      id: 3,
      firstname: "Joanne",
      lastname: "Wang",
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
      firstname: "Joanne",
      lastname: "Wang",
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
      firstname: "Joanne",
      lastname: "Wang",
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
      firstname: "Joanne",
      lastname: "Wang",
    },
  },
];
