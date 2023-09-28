import { Info, Ban } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AlertMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: "default" | "destructive";
  title?: string;
  message: string;
}

export function AlertMessage({
  variant,
  message,
  className,
}: AlertMessageProps) {
  return (
    <Alert variant={variant} className={className}>
      {variant === "default" ? (
        <Info className="h-4 w-4" />
      ) : (
        <Ban className="h-4 w-4" />
      )}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
