import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ColumnDef,
  flexRender,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { TablePagination } from "./TablePagination";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface IssueTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function IssuesTable<TData, TValue>({
  data,
  columns,
  project,
}: IssueTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      <div className="mb-3 flex items-center space-x-4">
        <div className="">
          <Label htmlFor="search-issue" className="sr-only">
            Search issues
          </Label>
          <Input
            name="search-issue"
            id="search-issue"
            placeholder="Search issues..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-[30ch] bg-zinc-100 dark:bg-background"
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="filter-category" className="font-bold">
            Category:
          </Label>
          <Select
            onValueChange={(event) => {
              table.getColumn("Category_name")?.setFilterValue(event);
              setSelectedCategory(event);
            }}
            name="filter-category"
            value={columnFilters.length === 0 ? "" : selectedCategory}
          >
            <SelectTrigger className="w-[20ch]">
              <SelectValue placeholder="all" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">all</SelectItem>
              {project.categories.map((category) => {
                return (
                  <SelectItem value={category.name}>{category.name}</SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="filter-status" className="font-bold">
            Status:
          </Label>
          <Select
            onValueChange={(event) => {
              table.getColumn("status")?.setFilterValue(event);
              setSelectedStatus(event);
            }}
            name="filter-status"
            value={columnFilters.length === 0 ? "" : selectedStatus}
          >
            <SelectTrigger className="w-[20ch]">
              <SelectValue placeholder="all" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">all</SelectItem>
              <SelectItem value="open">open</SelectItem>
              <SelectItem value="in progress">in progress</SelectItem>
              <SelectItem value="wait for review">wait for review</SelectItem>
              <SelectItem value="close">close</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="filter-status" className="font-bold">
            Priority:
          </Label>
          <Select
            onValueChange={(event) => {
              table.getColumn("priority")?.setFilterValue(event);
              setSelectedPriority(event);
            }}
            name="filter-status"
            value={columnFilters.length === 0 ? "" : selectedPriority}
          >
            <SelectTrigger className="w-[20ch]">
              <SelectValue placeholder="all" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">all</SelectItem>
              <SelectItem value="1">high</SelectItem>
              <SelectItem value="2">medium</SelectItem>
              <SelectItem value="3">low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          onClick={() => table.resetColumnFilters()}
          className="w-fit px-2 font-bold lg:px-3"
        >
          Reset
          <X className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <Table>
        <TableCaption>A list of issues of the project.</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TablePagination table={table} />
      </Table>
    </>
  );
}
