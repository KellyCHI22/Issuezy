import { Info, Ban } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type AlertMessageProps = {
  variant: "default" | "destructive";
  title?: string;
  message: string;
};

export function AlertMessage({ variant, message }: AlertMessageProps) {
  return (
    <Alert variant={variant}>
      {variant === "default" ? (
        <Info className="h-4 w-4" />
      ) : (
        <Ban className="h-4 w-4" />
      )}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
