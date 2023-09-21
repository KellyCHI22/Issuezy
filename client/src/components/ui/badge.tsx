import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  switch (priority) {
    case "1":
      return (
        <Badge className="bg-red-500 text-white hover:bg-red-600">high</Badge>
      );
    case "2":
      return (
        <Badge className="bg-yellow-300 text-black hover:bg-yellow-400">
          medium
        </Badge>
      );
    case "3":
      return (
        <Badge className="bg-green-500 text-black hover:bg-green-600">
          low
        </Badge>
      );
    default:
      return (
        <Badge className="bg-green-500 text-black hover:bg-green-600">
          low
        </Badge>
      );
  }
}

export { Badge, PriorityBadge, badgeVariants };
