import { useState } from "react";
import { ChevronsUpDown, Plus, Pencil, Trash2 } from "lucide-react";

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

export function CategoriesList({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = useState(false);
  const categoriesQuery = useQuery({
    queryKey: ["projects", project.id.toString(), "categories"],
    queryFn: () => getCategories(project.id),
  });

  // todo loading ui
  if (categoriesQuery.isLoading || categoriesQuery.isFetching)
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full space-y-2 rounded-lg bg-white p-6 dark:bg-gray-900"
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <h3 className="text-lg font-semibold">Categories</h3>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </div>
          <Button variant="secondary">
            <Plus className="mr-2 h-4 w-4" />
            Add category
          </Button>
        </div>
      </Collapsible>
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
        <AddCategorySheet projectId={project.id.toString()} />
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
              <EditCategorySheet
                projectId={project.id.toString()}
                category={category}
              />
              <DeleteCategoryAlert
                projectId={project.id.toString()}
                category={category}
              />
            </div>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
