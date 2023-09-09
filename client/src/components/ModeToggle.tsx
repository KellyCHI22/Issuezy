import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <Button variant="outline" className="px-2 py-2">
        <Sun
          className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all  dark:rotate-0 dark:scale-100"
          onClick={() => setTheme("light")}
        />
        <Moon
          className="absolute h-[1.2rem] w-[1.2rem]  rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          onClick={() => setTheme("dark")}
        />
      </Button>
      <span className="sr-only">Toggle theme</span>
    </>
  );
}
