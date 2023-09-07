import { IssueSheet } from "@/components/IssueSheet";
import IssuesTable from "@/components/IssuesTable";
import { issues } from "@/dummyData.ts";
import { columns } from "@/components/issueColumns";

export default function ProjectPage() {
  return (
    <div className="h-screen">
      <div className="h-full flex-1 flex-col space-y-4 p-8 md:flex">
        <div className="items-end justify-between space-y-2 lg:flex">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Project One</h2>
            <p className="mt-2 text-muted-foreground">
              This is the description of the project
            </p>
          </div>
          <IssueSheet />
        </div>
        <h3 className="text-xl font-bold tracking-tight">Issues</h3>
        <div className="overflow-hidden rounded-lg bg-white p-3 dark:bg-gray-900 lg:overflow-y-scroll">
          <IssuesTable data={issues} columns={columns} />
        </div>
      </div>
    </div>
  );
}
