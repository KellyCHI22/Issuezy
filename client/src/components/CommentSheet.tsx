import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "react-responsive";

export function CommentSheet() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default">Add Comment</Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className="dark:bg-zinc-900"
      >
        <SheetHeader>
          <SheetTitle>Add Comment</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="items-center gap-4">
            <Textarea id="text" value="some text" rows={4} className="" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Send</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
