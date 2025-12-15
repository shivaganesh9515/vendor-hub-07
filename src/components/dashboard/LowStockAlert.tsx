import { AlertTriangle } from "lucide-react";
import { lowStockItems } from "@/data/mockData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LowStockAlert() {
  if (lowStockItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-xl shadow-card border border-border/50 animate-fade-in">
      <div className="p-4 border-b border-border flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-destructive" />
        <h3 className="text-base font-semibold text-foreground">
          Low Stock Alert
        </h3>
      </div>
      <ScrollArea className="h-64">
        <div className="p-4 space-y-3">
          {lowStockItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.image}</span>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {item.name}
                  </p>
                  <p
                    className={cn(
                      "text-xs font-medium",
                      item.stock <= 2 ? "text-destructive" : "text-warning"
                    )}
                  >
                    {item.stock} left
                  </p>
                </div>
              </div>
              <Button variant="link" size="sm" className="text-xs text-primary">
                Update Stock
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
