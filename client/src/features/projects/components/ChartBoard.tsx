import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectChart } from "./ProjectChart";
import { Issue } from "@/features/issues/apis/issue-api";
import { Project } from "../apis/project-api";
import { useMemo } from "react";

export function ChartBoard({
  issues,
  project,
}: {
  issues: Issue[];
  project: Project;
}) {
  const { categoryCounts, statusCounts, priorityCounts } = useMemo(
    () => calculateIssue(issues, project),
    [issues, project],
  );

  return (
    <Tabs defaultValue="status">
      <div className="lg:flex lg:justify-between">
        <div className="pb-3 text-start lg:pb-0">
          <h2 className="text-xl font-bold">Issues overview</h2>
          <p className="pt-1 text-sm text-muted-foreground">
            Total issues: {issues.length}
          </p>
        </div>
        <TabsList className="text-end">
          <TabsTrigger value="status">Status</TabsTrigger>
          <TabsTrigger value="category">Category</TabsTrigger>
          <TabsTrigger value="priority">Priority</TabsTrigger>
        </TabsList>
      </div>
      {issues.length ? (
        <>
          <TabsContent value="status">
            <ProjectChart data={statusCounts} />
          </TabsContent>
          <TabsContent value="category">
            <ProjectChart data={categoryCounts} />
          </TabsContent>
          <TabsContent value="priority">
            <ProjectChart data={priorityCounts} />
          </TabsContent>
        </>
      ) : (
        <p className="py-5 text-muted-foreground">There are no issues yet.</p>
      )}
    </Tabs>
  );
}

function calculateIssue(issues: Issue[], project: Project) {
  const allCategories = project.categories.map((category) => category.name);
  const allStatuses = ["open", "in progress", "wait for review", "close"];
  const priorityNames = {
    "1": "high",
    "2": "medium",
    "3": "low",
  };

  // Initialize counters for categories, statuses, and priorities with counts set to 0
  const categoryCounts = Object.fromEntries(
    allCategories.map((category) => [category, 0]),
  );
  const statusCounts = Object.fromEntries(
    allStatuses.map((status) => [status, 0]),
  );
  const priorityCounts = { high: 0, medium: 0, low: 0 };

  // Iterate through the list of issues
  issues.forEach((issue) => {
    const category = issue.Category.name;
    categoryCounts[category] += 1;

    const status = issue.status;
    statusCounts[status] += 1;

    const priorityValue = issue.priority;
    const priorityName = priorityNames[priorityValue];

    priorityCounts[priorityName] += 1;
  });
  return { categoryCounts, statusCounts, priorityCounts };
}
