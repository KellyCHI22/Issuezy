import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Project } from "../../projects/apis/project-api";
import { useQuery } from "@tanstack/react-query";
import { Category, getCategories } from "../apis/category-api";
import { AddCategorySheet } from "./AddCategorySheet";
import { EditCategorySheet } from "./EditCategorySheet";
import { DeleteCategoryAlert } from "./DeleteCategoryAlert";
import { Authorization } from "@/components/Authorization";

export function CategoriesList({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = useState(false);
  const categoriesQuery = useQuery({
    queryKey: ["projects", project.id.toString(), "categories"],
    queryFn: () => getCategories({ projectId: project.id.toString() }),
  });

  if (categoriesQuery.isLoading || categoriesQuery.isFetching)
    return (
      <div className="w-full space-y-2 rounded-lg bg-white p-6 dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <h3 className="text-lg font-semibold">Categories</h3>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </div>
        </div>
      </div>
    );
  if (categoriesQuery.status === "error") {
    return <h1>Something went wrong</h1>;
  }

  const categories = categoriesQuery.data.categories as Category[];

  const defaultCategories = categories.filter((category) => category.isDefault);
  const projectCategories = categories.filter(
    (category) => !category.isDefault,
  );

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2 rounded-lg bg-white p-6 dark:bg-gray-900"
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <h3 className="text-lg font-semibold">Categories</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <Authorization projectId={project.id.toString()} action="category:add">
          <AddCategorySheet projectId={project.id.toString()} />
        </Authorization>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="">
          {defaultCategories.map((category) => (
            <div key={category.id} className="flex justify-between py-2">
              <Badge>{category.name}</Badge>
              <Badge variant="outline">Default</Badge>
            </div>
          ))}
        </div>
        {projectCategories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between text-sm"
          >
            <Badge className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600">
              {category.name}
            </Badge>
            <div className="space-x-2">
              <Authorization
                projectId={project.id.toString()}
                action="category:edit"
              >
                <EditCategorySheet
                  projectId={project.id.toString()}
                  category={category}
                />
              </Authorization>
              <Authorization
                projectId={project.id.toString()}
                action="category:delete"
              >
                <DeleteCategoryAlert
                  projectId={project.id.toString()}
                  category={category}
                />
              </Authorization>
            </div>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
